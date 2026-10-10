import { createHash, randomUUID, timingSafeEqual } from 'node:crypto'
import { Redis } from '@upstash/redis'

export type PostComment = {
  body: string
  createdAt: string
  id: string
  persona: number
}

type CreateResult = 'full' | 'ok' | 'rate-limited'

type CommentsStore = {
  create: (slug: string, comment: PostComment, rateKeys: string[]) => Promise<CreateResult>
  list: (slug: string) => Promise<PostComment[]>
  remove: (slug: string, id: string) => Promise<boolean>
}

type RedisEvalClient = {
  eval: (
    script: string,
    keys: string[],
    args: string[],
  ) => Promise<unknown>
}

type HandlerDependencies = {
  adminToken: () => string | undefined
  createId: () => string
  createStore: () => CommentsStore
  hashIdentity: (value: string) => string
  now: () => Date
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

export const maxCommentsPerPost = 500
export const commentCooldownSeconds = 30
const maxBodyLength = 1000

const listScript = `
return redis.call('HVALS', KEYS[1])
`

const createScript = `
for i = 2, #KEYS do
  if redis.call('EXISTS', KEYS[i]) == 1 then
    return 'rate-limited'
  end
end

if redis.call('HLEN', KEYS[1]) >= tonumber(ARGV[3]) then
  return 'full'
end

for i = 2, #KEYS do
  redis.call('SET', KEYS[i], '1', 'EX', tonumber(ARGV[4]))
end

redis.call('HSET', KEYS[1], ARGV[1], ARGV[2])
return 'ok'
`

const removeScript = `
return redis.call('HDEL', KEYS[1], ARGV[1])
`

const slugPattern = /^[a-z0-9](?:[a-z0-9-]{0,98}[a-z0-9])?$/
const visitorIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const commentIdPattern = visitorIdPattern
// Strip control characters except tab and newline so stored text stays printable.
// eslint-disable-next-line no-control-regex
const controlCharacters = /[\u0000-\u0008\u000b-\u001f\u007f]/g

function commentsKey(slug: string) {
  return `post:${slug}:comments`
}

function parseComment(value: unknown): PostComment | null {
  // Upstash may hand back stored JSON already deserialized.
  let parsed = value

  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value)
    } catch {
      return null
    }
  }

  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('id' in parsed) ||
    !('persona' in parsed) ||
    !('body' in parsed) ||
    !('createdAt' in parsed) ||
    typeof parsed.id !== 'string' ||
    typeof parsed.persona !== 'number' ||
    typeof parsed.body !== 'string' ||
    typeof parsed.createdAt !== 'string'
  ) {
    return null
  }

  return {
    body: parsed.body,
    createdAt: parsed.createdAt,
    id: parsed.id,
    persona: parsed.persona,
  }
}

export function createRedisCommentsStore(redis: RedisEvalClient): CommentsStore {
  return {
    async create(slug, comment, rateKeys) {
      const result = await redis.eval(
        createScript,
        [commentsKey(slug), ...rateKeys],
        [
          comment.id,
          JSON.stringify(comment),
          String(maxCommentsPerPost),
          String(commentCooldownSeconds),
        ],
      )

      if (result !== 'ok' && result !== 'full' && result !== 'rate-limited') {
        throw new Error('Unexpected Redis comments response')
      }

      return result
    },

    async list(slug) {
      const result = await redis.eval(listScript, [commentsKey(slug)], [])

      if (!Array.isArray(result)) {
        throw new Error('Unexpected Redis comments response')
      }

      return result
        .map(parseComment)
        .filter((comment): comment is PostComment => comment !== null)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    },

    async remove(slug, id) {
      const result = await redis.eval(removeScript, [commentsKey(slug)], [id])

      return Number(result) === 1
    },
  }
}

export function hashIdentity(value: string, salt: string) {
  return createHash('sha256').update(`${salt}:comment:${value}`).digest('hex')
}

// A stable, non-reversible number per visitor that the page turns into a default
// name and avatar, so commenters stay anonymous but recognizable across comments.
export function personaFromVisitorHash(visitorHash: string) {
  return createHash('sha256').update(`persona:${visitorHash}`).digest().readUInt32BE(0)
}

function normalizeText(value: string) {
  return value.replace(/\r\n?/g, '\n').replace(controlCharacters, '').trim()
}

function tokensMatch(provided: string, expected: string) {
  const providedBuffer = Buffer.from(provided)
  const expectedBuffer = Buffer.from(expected)

  return providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
}

function clientAddress(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for') ?? ''

  return forwardedFor.split(',')[0]?.trim() || null
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

export function createPostCommentsHandler(dependencies: HandlerDependencies) {
  async function listComments(slug: string) {
    try {
      const comments = await dependencies.createStore().list(slug)

      return jsonResponse({ comments }, 200)
    } catch {
      return jsonResponse({ error: 'Comments temporarily unavailable' }, 503)
    }
  }

  async function createComment(request: Request, slug: string) {
    let body: unknown

    try {
      body = await request.json()
    } catch {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }

    if (
      typeof body !== 'object' ||
      body === null ||
      !('visitorId' in body) ||
      !('body' in body) ||
      typeof body.visitorId !== 'string' ||
      !visitorIdPattern.test(body.visitorId) ||
      typeof body.body !== 'string'
    ) {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }

    // Hidden field that people never see; bots that fill it get a quiet rejection.
    if ('website' in body && body.website !== '' && body.website !== undefined) {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }

    const text = normalizeText(body.body).replace(/\n{3,}/g, '\n\n')

    if (text.length === 0 || [...text].length > maxBodyLength) {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }

    try {
      const visitorHash = dependencies.hashIdentity(body.visitorId)
      const rateKeys = [`comment-cooldown:visitor:${visitorHash}`]
      const address = clientAddress(request)

      if (address) {
        rateKeys.push(`comment-cooldown:ip:${dependencies.hashIdentity(address)}`)
      }

      const comment: PostComment = {
        body: text,
        createdAt: dependencies.now().toISOString(),
        id: dependencies.createId(),
        persona: personaFromVisitorHash(visitorHash),
      }
      const result = await dependencies.createStore().create(slug, comment, rateKeys)

      if (result === 'rate-limited') {
        return jsonResponse(
          { error: 'Too many comments' },
          429,
          { 'Retry-After': String(commentCooldownSeconds) },
        )
      }

      if (result === 'full') {
        return jsonResponse({ error: 'Comments are closed' }, 409)
      }

      return jsonResponse({ comment }, 201)
    } catch {
      return jsonResponse({ error: 'Comments temporarily unavailable' }, 503)
    }
  }

  async function deleteComment(request: Request, slug: string, id: string) {
    const expectedToken = dependencies.adminToken()
    const authorization = request.headers.get('authorization') ?? ''
    const providedToken = authorization.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : ''

    if (!expectedToken || !providedToken || !tokensMatch(providedToken, expectedToken)) {
      return jsonResponse({ error: 'Unauthorized' }, 401)
    }

    if (!commentIdPattern.test(id)) {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }

    try {
      const deleted = await dependencies.createStore().remove(slug, id)

      return deleted
        ? jsonResponse({ deleted: true }, 200)
        : jsonResponse({ error: 'Not found' }, 404)
    } catch {
      return jsonResponse({ error: 'Comments temporarily unavailable' }, 503)
    }
  }

  return async function postCommentsHandler(request: Request) {
    const url = new URL(request.url)
    const slug = url.searchParams.get('slug') ?? ''

    if (!slugPattern.test(slug)) {
      return jsonResponse({ error: 'Invalid request' }, 400)
    }

    if (request.method === 'GET') {
      return listComments(slug)
    }

    if (request.method === 'POST') {
      return createComment(request, slug)
    }

    if (request.method === 'DELETE') {
      return deleteComment(request, slug, url.searchParams.get('id') ?? '')
    }

    return jsonResponse(
      { error: 'Method not allowed' },
      405,
      { Allow: 'GET, POST, DELETE' },
    )
  }
}

const postCommentsHandler = createPostCommentsHandler({
  adminToken: () => process.env.COMMENTS_ADMIN_TOKEN,
  createId: () => randomUUID(),
  createStore: () => createRedisCommentsStore(Redis.fromEnv()),
  hashIdentity: (value) => {
    const salt = process.env.POST_METRICS_SALT

    if (!salt) {
      throw new Error('POST_METRICS_SALT is not configured')
    }

    return hashIdentity(value, salt)
  },
  now: () => new Date(),
})

const forwardedHeaders = ['authorization', 'content-type', 'x-forwarded-for']

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const method = request.method ?? 'GET'
  const body = method === 'GET' || method === 'HEAD' || request.body === undefined
    ? undefined
    : typeof request.body === 'string'
      ? request.body
      : JSON.stringify(request.body)
  const headers = new Headers()

  for (const name of forwardedHeaders) {
    const value = request.headers[name]

    if (typeof value === 'string') {
      headers.set(name, value)
    }
  }

  const webRequest = new Request(
    new URL(request.url ?? '/', 'https://post-comments.internal'),
    { body, headers, method },
  )
  const webResponse = await postCommentsHandler(webRequest)

  webResponse.headers.forEach((value, name) => response.setHeader(name, value))
  response.status(webResponse.status)
  response.send(await webResponse.text())
}
