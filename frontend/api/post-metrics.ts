import { createHash } from 'node:crypto'
import { Redis } from '@upstash/redis'

type PostMetricCounts = {
  liked: boolean
  likes: number
  views: number
}

type MetricsStore = {
  recordView: (slug: string, visitorHash: string) => Promise<PostMetricCounts>
  toggleLike: (slug: string, visitorHash: string) => Promise<PostMetricCounts>
}

type RedisEvalClient = {
  eval: (
    script: string,
    keys: string[],
    args: string[],
  ) => Promise<unknown>
}

type HandlerDependencies = {
  createStore: () => MetricsStore
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

const viewScript = `
local is_new_view = redis.call('SET', KEYS[4], '1', 'EX', 172800, 'NX')
if is_new_view then
  redis.call('INCR', KEYS[1])
end

local views = tonumber(redis.call('GET', KEYS[1]) or '0')
local likes = tonumber(redis.call('GET', KEYS[2]) or '0')
local liked = redis.call('SISMEMBER', KEYS[3], ARGV[1])
return { views, likes, liked }
`

const toggleLikeScript = `
local liked
local likes

if redis.call('SISMEMBER', KEYS[3], ARGV[1]) == 1 then
  redis.call('SREM', KEYS[3], ARGV[1])
  likes = tonumber(redis.call('GET', KEYS[2]) or '0')
  if likes > 0 then
    likes = redis.call('DECR', KEYS[2])
  else
    redis.call('SET', KEYS[2], '0')
    likes = 0
  end
  liked = 0
else
  redis.call('SADD', KEYS[3], ARGV[1])
  likes = redis.call('INCR', KEYS[2])
  liked = 1
end

local views = tonumber(redis.call('GET', KEYS[1]) or '0')
return { views, likes, liked }
`

const slugPattern = /^[a-z0-9](?:[a-z0-9-]{0,98}[a-z0-9])?$/
const visitorIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function metricKeys(slug: string) {
  const prefix = `post:${slug}`

  return {
    likedVisitors: `${prefix}:liked-visitors`,
    likes: `${prefix}:likes`,
    views: `${prefix}:views`,
  }
}

function parseMetricResult(result: unknown): PostMetricCounts {
  if (!Array.isArray(result) || result.length !== 3) {
    throw new Error('Unexpected Redis metrics response')
  }

  const [views, likes, liked] = result.map(Number)

  if (![views, likes, liked].every(Number.isFinite)) {
    throw new Error('Invalid Redis metrics response')
  }

  return {
    liked: liked === 1,
    likes: Math.max(0, likes),
    views: Math.max(0, views),
  }
}

export function createRedisMetricsStore(
  redis: RedisEvalClient,
  currentDate = () => new Date().toISOString().slice(0, 10),
): MetricsStore {
  return {
    async recordView(slug, visitorHash) {
      const keys = metricKeys(slug)
      const viewKey = `post:${slug}:viewed:${currentDate()}:${visitorHash}`
      const result = await redis.eval(
        viewScript,
        [keys.views, keys.likes, keys.likedVisitors, viewKey],
        [visitorHash],
      )

      return parseMetricResult(result)
    },

    async toggleLike(slug, visitorHash) {
      const keys = metricKeys(slug)
      const result = await redis.eval(
        toggleLikeScript,
        [keys.views, keys.likes, keys.likedVisitors],
        [visitorHash],
      )

      return parseMetricResult(result)
    },
  }
}

export function hashVisitorId(visitorId: string, salt: string) {
  return createHash('sha256').update(`${salt}:${visitorId}`).digest('hex')
}

function jsonResponse(
  body: unknown,
  status: number,
  extraHeaders?: Record<string, string>,
) {
  return Response.json(body, {
    headers: {
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
    status,
  })
}

export function createPostMetricsHandler(dependencies: HandlerDependencies) {
  return async function postMetricsHandler(request: Request) {
    if (request.method !== 'POST') {
      return jsonResponse(
        { error: 'Method not allowed' },
        405,
        { Allow: 'POST' },
      )
    }

    const slug = new URL(request.url).searchParams.get('slug') ?? ''
    let body: unknown

    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }

    if (
      !slugPattern.test(slug) ||
      typeof body !== 'object' ||
      body === null ||
      !('action' in body) ||
      !('visitorId' in body) ||
      (body.action !== 'view' && body.action !== 'toggle-like') ||
      typeof body.visitorId !== 'string' ||
      !visitorIdPattern.test(body.visitorId)
    ) {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }

    try {
      const visitorHash = dependencies.hashVisitorId(body.visitorId)
      const store = dependencies.createStore()
      const metrics = body.action === 'view'
        ? await store.recordView(slug, visitorHash)
        : await store.toggleLike(slug, visitorHash)

      return jsonResponse(metrics, 200)
    } catch {
      return jsonResponse({ error: 'Metrics temporarily unavailable' }, 503)
    }
  }
}

const postMetricsHandler = createPostMetricsHandler({
  createStore: () => createRedisMetricsStore(Redis.fromEnv()),
  hashVisitorId: (visitorId) => {
    const salt = process.env.POST_METRICS_SALT

    if (!salt) {
      throw new Error('POST_METRICS_SALT is not configured')
    }

    return hashVisitorId(visitorId, salt)
  },
})

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const method = request.method ?? 'GET'
  const contentType = request.headers['content-type']
  const body = method === 'GET' || method === 'HEAD' || request.body === undefined
    ? undefined
    : typeof request.body === 'string'
      ? request.body
      : JSON.stringify(request.body)
  const webRequest = new Request(
    new URL(request.url ?? '/', 'https://post-metrics.internal'),
    {
      body,
      headers: typeof contentType === 'string'
        ? { 'Content-Type': contentType }
        : undefined,
      method,
    },
  )
  const webResponse = await postMetricsHandler(webRequest)

  webResponse.headers.forEach((value, name) => response.setHeader(name, value))
  response.status(webResponse.status)
  response.send(await webResponse.text())
}
