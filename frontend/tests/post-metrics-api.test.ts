import { describe, expect, it, vi } from 'vitest'

type MetricCounts = {
  liked: boolean
  likes: number
  views: number
}

type MetricsStore = {
  recordView: (slug: string, visitorHash: string) => Promise<MetricCounts>
  toggleLike: (slug: string, visitorHash: string) => Promise<MetricCounts>
}

type ApiModule = {
  default: (
    request: {
      body?: unknown
      headers: Record<string, string | undefined>
      method?: string
      url?: string
    },
    response: {
      send: (body: string) => void
      setHeader: (name: string, value: string) => void
      status: (statusCode: number) => unknown
    },
  ) => Promise<void>
  createPostMetricsHandler: (dependencies: {
    createStore: () => MetricsStore
    hashVisitorId: (visitorId: string) => string
  }) => (request: Request) => Promise<Response>
  createRedisMetricsStore: (
    redis: { eval: (...args: unknown[]) => Promise<unknown> },
    currentDate?: () => string,
  ) => MetricsStore
  hashVisitorId: (visitorId: string, salt: string) => string
}

async function loadApiModule(): Promise<ApiModule | null> {
  const moduleUrl = new URL('../api/post-metrics.ts', import.meta.url).href

  return import(/* @vite-ignore */ moduleUrl).catch(() => null) as Promise<ApiModule | null>
}

function postRequest(slug: string, body: unknown) {
  return new Request(`https://www.xinyuhuang.space/api/post-metrics?slug=${slug}`, {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
}

describe('post metrics API', () => {
  it('adapts a relative Vercel Node request and response', async () => {
    const api = await loadApiModule()
    expect(api, 'post metrics API module should exist').not.toBeNull()
    if (!api) return

    const response = {
      body: '',
      headers: new Map<string, string>(),
      statusCode: 0,
      send(body: string) {
        this.body = body
      },
      setHeader(name: string, value: string) {
        this.headers.set(name.toLowerCase(), value)
      },
      status(statusCode: number) {
        this.statusCode = statusCode
        return this
      },
    }

    await api.default({
      body: { action: 'view', visitorId: 'invalid' },
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      url: '/api/post-metrics?slug=jev-decision-model',
    }, response)

    expect(response.statusCode).toBe(400)
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(JSON.parse(response.body)).toEqual({ error: 'Invalid request' })
  })

  it('hashes the visitor before recording a view', async () => {
    const api = await loadApiModule()
    expect(api, 'post metrics API module should exist').not.toBeNull()
    if (!api) return

    const recordView = vi.fn().mockResolvedValue({ liked: false, likes: 4, views: 12 })
    const handler = api.createPostMetricsHandler({
      createStore: () => ({ recordView, toggleLike: vi.fn() }),
      hashVisitorId: () => 'hashed-visitor',
    })
    const response = await handler(postRequest('jev-decision-model', {
      action: 'view',
      visitorId: '00000000-0000-4000-8000-000000000001',
    }))

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(await response.json()).toEqual({ liked: false, likes: 4, views: 12 })
    expect(recordView).toHaveBeenCalledWith('jev-decision-model', 'hashed-visitor')
  })

  it('routes a valid like toggle to the storage adapter', async () => {
    const api = await loadApiModule()
    expect(api, 'post metrics API module should exist').not.toBeNull()
    if (!api) return

    const toggleLike = vi.fn().mockResolvedValue({ liked: true, likes: 5, views: 12 })
    const handler = api.createPostMetricsHandler({
      createStore: () => ({ recordView: vi.fn(), toggleLike }),
      hashVisitorId: () => 'hashed-visitor',
    })
    const response = await handler(postRequest('jev-decision-model', {
      action: 'toggle-like',
      visitorId: '00000000-0000-4000-8000-000000000001',
    }))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ liked: true, likes: 5, views: 12 })
    expect(toggleLike).toHaveBeenCalledWith('jev-decision-model', 'hashed-visitor')
  })

  it.each([
    ['invalid slug', '../private', {
      action: 'view',
      visitorId: '00000000-0000-4000-8000-000000000001',
    }],
    ['invalid action', 'jev-decision-model', {
      action: 'delete',
      visitorId: '00000000-0000-4000-8000-000000000001',
    }],
    ['invalid visitor', 'jev-decision-model', {
      action: 'view',
      visitorId: 'short',
    }],
  ])('rejects an %s without touching storage', async (_label, slug, body) => {
    const api = await loadApiModule()
    expect(api, 'post metrics API module should exist').not.toBeNull()
    if (!api) return

    const createStore = vi.fn()
    const handler = api.createPostMetricsHandler({
      createStore,
      hashVisitorId: () => 'hashed-visitor',
    })
    const response = await handler(postRequest(slug, body))

    expect(response.status).toBe(400)
    expect(createStore).not.toHaveBeenCalled()
  })

  it('returns a quiet service-unavailable response when storage fails', async () => {
    const api = await loadApiModule()
    expect(api, 'post metrics API module should exist').not.toBeNull()
    if (!api) return

    const handler = api.createPostMetricsHandler({
      createStore: () => ({
        recordView: vi.fn().mockRejectedValue(new Error('secret Redis details')),
        toggleLike: vi.fn(),
      }),
      hashVisitorId: () => 'hashed-visitor',
    })
    const response = await handler(postRequest('jev-decision-model', {
      action: 'view',
      visitorId: '00000000-0000-4000-8000-000000000001',
    }))

    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({ error: 'Metrics temporarily unavailable' })
  })

  it('uses one atomic Redis request for a deduplicated view', async () => {
    const api = await loadApiModule()
    expect(api, 'post metrics API module should exist').not.toBeNull()
    if (!api) return

    const evalCommand = vi.fn().mockResolvedValue([12, 4, 0])
    const store = api.createRedisMetricsStore(
      { eval: evalCommand },
      () => '2026-09-20',
    )

    await expect(store.recordView('jev-decision-model', 'hashed-visitor'))
      .resolves.toEqual({ liked: false, likes: 4, views: 12 })
    expect(evalCommand).toHaveBeenCalledTimes(1)
    expect(evalCommand.mock.calls[0]?.[1]).toEqual([
      'post:jev-decision-model:views',
      'post:jev-decision-model:likes',
      'post:jev-decision-model:liked-visitors',
      'post:jev-decision-model:viewed:2026-09-20:hashed-visitor',
    ])
  })

  it('uses one atomic Redis request for a like toggle', async () => {
    const api = await loadApiModule()
    expect(api, 'post metrics API module should exist').not.toBeNull()
    if (!api) return

    const evalCommand = vi.fn().mockResolvedValue([12, 5, 1])
    const store = api.createRedisMetricsStore({ eval: evalCommand })

    await expect(store.toggleLike('jev-decision-model', 'hashed-visitor'))
      .resolves.toEqual({ liked: true, likes: 5, views: 12 })
    expect(evalCommand).toHaveBeenCalledTimes(1)
  })

  it('creates a stable salted visitor hash', async () => {
    const api = await loadApiModule()
    expect(api, 'post metrics API module should exist').not.toBeNull()
    if (!api) return

    const firstHash = api.hashVisitorId('visitor-a', 'site-secret')

    expect(firstHash).toBe(api.hashVisitorId('visitor-a', 'site-secret'))
    expect(firstHash).not.toContain('visitor-a')
    expect(firstHash).not.toBe(api.hashVisitorId('visitor-a', 'other-secret'))
  })
})
