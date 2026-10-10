import { describe, expect, it, vi } from 'vitest'
import {
  createPostCommentsHandler,
  createRedisCommentsStore,
  personaFromVisitorHash,
  type PostComment,
} from '../api/post-comments'

const visitorId = '00000000-0000-4000-8000-000000000001'
const commentId = '00000000-0000-4000-8000-0000000000aa'
const createdAt = '2026-10-09T12:00:00.000Z'

function createMemoryStore() {
  const comments = new Map<string, PostComment>()
  const cooldowns = new Set<string>()

  return {
    comments,
    store: {
      create: vi.fn(async (_slug: string, comment: PostComment, rateKeys: string[]) => {
        if (rateKeys.some((key) => cooldowns.has(key))) {
          return 'rate-limited' as const
        }

        rateKeys.forEach((key) => cooldowns.add(key))
        comments.set(comment.id, comment)
        return 'ok' as const
      }),
      list: vi.fn(async () => [...comments.values()]),
      remove: vi.fn(async (_slug: string, id: string) => comments.delete(id)),
    },
  }
}

function createHandler(store = createMemoryStore().store) {
  return createPostCommentsHandler({
    adminToken: () => 'secret-token',
    createId: () => commentId,
    createStore: () => store,
    hashIdentity: (value) => `hash:${value}`,
    now: () => new Date(createdAt),
  })
}

function postRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request('https://www.xinyuhuang.space/api/post-comments?slug=jev-decision-model', {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', ...headers },
    method: 'POST',
  })
}

describe('post comments API', () => {
  it('stores a trimmed anonymous comment and lists it back', async () => {
    const memory = createMemoryStore()
    const handler = createHandler(memory.store)

    const created = await handler(postRequest({
      body: '  写得很好\r\n\r\n\r\n\r\n谢谢  ',
      visitorId,
      website: '',
    }))

    expect(created.status).toBe(201)
    expect(await created.json()).toEqual({
      comment: {
        body: '写得很好\n\n谢谢',
        createdAt,
        id: commentId,
        persona: personaFromVisitorHash(`hash:${visitorId}`),
      },
    })

    const listed = await handler(new Request(
      'https://www.xinyuhuang.space/api/post-comments?slug=jev-decision-model',
    ))

    expect(listed.status).toBe(200)
    expect(listed.headers.get('cache-control')).toBe('no-store')
    expect((await listed.json()).comments).toHaveLength(1)
  })

  it('rate limits by visitor and by forwarded address', async () => {
    const memory = createMemoryStore()
    const handler = createHandler(memory.store)
    const body = { body: 'hi', visitorId }

    await handler(postRequest(body, { 'x-forwarded-for': '203.0.113.7, 10.0.0.1' }))

    expect(memory.store.create).toHaveBeenCalledWith(
      'jev-decision-model',
      expect.anything(),
      [
        `comment-cooldown:visitor:hash:${visitorId}`,
        'comment-cooldown:ip:hash:203.0.113.7',
      ],
    )

    const second = await handler(postRequest(
      { ...body, visitorId: '00000000-0000-4000-8000-000000000002' },
      { 'x-forwarded-for': '203.0.113.7' },
    ))

    expect(second.status).toBe(429)
    expect(second.headers.get('retry-after')).toBe('30')
  })

  it.each([
    ['empty body', { body: ' \n ', visitorId }],
    ['long body', { body: 'x'.repeat(1001), visitorId }],
    ['bad visitor', { body: 'hi', visitorId: 'nope' }],
    ['filled honeypot', { body: 'hi', visitorId, website: 'http://spam' }],
  ])('rejects %s', async (_label, body) => {
    const memory = createMemoryStore()
    const response = await createHandler(memory.store)(postRequest(body))

    expect(response.status).toBe(400)
    expect(memory.store.create).not.toHaveBeenCalled()
  })

  it('rejects an invalid slug', async () => {
    const response = await createHandler()(new Request(
      'https://www.xinyuhuang.space/api/post-comments?slug=../etc',
    ))

    expect(response.status).toBe(400)
  })

  it('only deletes with the admin token', async () => {
    const memory = createMemoryStore()
    const handler = createHandler(memory.store)
    await handler(postRequest({ body: 'hi', visitorId }))
    const deleteUrl =
      `https://www.xinyuhuang.space/api/post-comments?slug=jev-decision-model&id=${commentId}`

    const denied = await handler(new Request(deleteUrl, {
      headers: { Authorization: 'Bearer wrong-token' },
      method: 'DELETE',
    }))
    expect(denied.status).toBe(401)
    expect(memory.comments.size).toBe(1)

    const deleted = await handler(new Request(deleteUrl, {
      headers: { Authorization: 'Bearer secret-token' },
      method: 'DELETE',
    }))
    expect(deleted.status).toBe(200)
    expect(memory.comments.size).toBe(0)
  })

  it('refuses deletes when no admin token is configured', async () => {
    const handler = createPostCommentsHandler({
      adminToken: () => undefined,
      createId: () => commentId,
      createStore: () => createMemoryStore().store,
      hashIdentity: (value) => value,
      now: () => new Date(createdAt),
    })

    const response = await handler(new Request(
      `https://www.xinyuhuang.space/api/post-comments?slug=jev-decision-model&id=${commentId}`,
      { headers: { Authorization: 'Bearer ' }, method: 'DELETE' },
    ))

    expect(response.status).toBe(401)
  })

  it('reports 503 when the store fails', async () => {
    const handler = createPostCommentsHandler({
      adminToken: () => 'secret-token',
      createId: () => commentId,
      createStore: () => {
        throw new Error('redis down')
      },
      hashIdentity: (value) => value,
      now: () => new Date(createdAt),
    })

    const response = await handler(new Request(
      'https://www.xinyuhuang.space/api/post-comments?slug=jev-decision-model',
    ))

    expect(response.status).toBe(503)
  })
})

describe('comment personas', () => {
  it('gives the same visitor the same persona and different visitors different ones', () => {
    expect(personaFromVisitorHash('a')).toBe(personaFromVisitorHash('a'))
    expect(personaFromVisitorHash('a')).not.toBe(personaFromVisitorHash('b'))
  })
})

describe('redis comments store', () => {
  it('parses stored JSON in either form and sorts oldest first', async () => {
    const newer = { body: 'b', createdAt: '2026-10-09T13:00:00.000Z', id: 'b', persona: 2 }
    const older = { body: 'a', createdAt: '2026-10-09T12:00:00.000Z', id: 'a', persona: 1 }
    const redis = { eval: vi.fn().mockResolvedValue([JSON.stringify(newer), older, 'garbage']) }

    expect(await createRedisCommentsStore(redis).list('jev-decision-model'))
      .toEqual([older, newer])
    expect(redis.eval).toHaveBeenCalledWith(
      expect.any(String),
      ['post:jev-decision-model:comments'],
      [],
    )
  })

  it('passes the cap and cooldown to the create script', async () => {
    const redis = { eval: vi.fn().mockResolvedValue('ok') }
    const comment = { body: 'a', createdAt, id: commentId, persona: 1 }

    await createRedisCommentsStore(redis).create('jev-decision-model', comment, ['cooldown'])

    expect(redis.eval).toHaveBeenCalledWith(
      expect.any(String),
      ['post:jev-decision-model:comments', 'cooldown'],
      [commentId, JSON.stringify(comment), '500', '30'],
    )
  })
})
