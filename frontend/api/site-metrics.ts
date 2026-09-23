import { createHash } from 'node:crypto'
import { Redis } from '@upstash/redis'

type SiteMetricCounts = {
  views: number
  visitors: number
}

type SiteMetricsStore = {
  recordView: (path: string, visitorHash: string) => Promise<SiteMetricCounts>
}

type RedisEvalClient = {
  eval: (script: string, keys: string[], args: string[]) => Promise<unknown>
}

type HandlerDependencies = {
  createStore: () => SiteMetricsStore
  hashVisitorId: (visitorId: string) => string
}

type VercelRequest = {
  body?: unknown
  headers: Record<string, string | string[] | undefined>
  method?: string
  url?: string
}

type VercelResponse = {
  send: (body: string) => void
  setHeader: (name: string, value: string) => void
  status: (statusCode: number) => unknown
}

const visitorIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const sitePathPattern = /^\/(?:intro|home|about|work|blog(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)?|collection)?$/

// Vercel compiles each API entry separately, so this module must load on its own.
function hashVisitorId(visitorId: string, salt: string) {
  return createHash('sha256').update(`${salt}:${visitorId}`).digest('hex')
}

const recordViewScript = `
local is_new_view = redis.call('SET', KEYS[3], '1', 'EX', 30, 'NX')
if is_new_view then
  redis.call('INCR', KEYS[1])
end
redis.call('PFADD', KEYS[2], ARGV[1])
local views = tonumber(redis.call('GET', KEYS[1]) or '0')
local visitors = tonumber(redis.call('PFCOUNT', KEYS[2]) or '0')
return { views, visitors }
`

function parseCounts(result: unknown): SiteMetricCounts {
  if (!Array.isArray(result) || result.length !== 2) {
    throw new Error('Unexpected site metrics response')
  }

  const [views, visitors] = result.map(Number)
  if (![views, visitors].every(Number.isFinite)) {
    throw new Error('Invalid site metrics response')
  }

  return { views: Math.max(0, views), visitors: Math.max(0, visitors) }
}

export function createRedisSiteMetricsStore(redis: RedisEvalClient): SiteMetricsStore {
  return {
    async recordView(path, visitorHash) {
      const result = await redis.eval(
        recordViewScript,
        ['site:views', 'site:visitors', `site:viewed:${path}:${visitorHash}`],
        [visitorHash],
      )

      return parseCounts(result)
    },
  }
}

function jsonResponse(body: unknown, status: number) {
  return Response.json(body, {
    headers: { 'Cache-Control': 'no-store' },
    status,
  })
}

export function createSiteMetricsHandler(dependencies: HandlerDependencies) {
  return async function siteMetricsHandler(request: Request) {
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405)
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }

    if (
      typeof body !== 'object' || body === null ||
      !('path' in body) || !('visitorId' in body) ||
      typeof body.path !== 'string' || body.path.length > 120 || !sitePathPattern.test(body.path) ||
      typeof body.visitorId !== 'string' || !visitorIdPattern.test(body.visitorId)
    ) {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }

    try {
      const counts = await dependencies.createStore().recordView(
        body.path,
        dependencies.hashVisitorId(body.visitorId),
      )
      return jsonResponse(counts, 200)
    } catch {
      return jsonResponse({ error: 'Metrics temporarily unavailable' }, 503)
    }
  }
}

const siteMetricsHandler = createSiteMetricsHandler({
  createStore: () => createRedisSiteMetricsStore(Redis.fromEnv()),
  hashVisitorId: (visitorId) => {
    const salt = process.env.POST_METRICS_SALT
    if (!salt) {
      throw new Error('POST_METRICS_SALT is not configured')
    }
    return hashVisitorId(visitorId, salt)
  },
})

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const method = request.method ?? 'GET'
  const contentType = request.headers['content-type']
  const body = method === 'GET' || method === 'HEAD' || request.body === undefined
    ? undefined
    : typeof request.body === 'string'
      ? request.body
      : JSON.stringify(request.body)
  const webRequest = new Request(
    new URL(request.url ?? '/', 'https://site-metrics.internal'),
    {
      body,
      headers: typeof contentType === 'string'
        ? { 'Content-Type': contentType }
        : undefined,
      method,
    },
  )
  const webResponse = await siteMetricsHandler(webRequest)

  webResponse.headers.forEach((value, name) => response.setHeader(name, value))
  response.status(webResponse.status)
  response.send(await webResponse.text())
}
