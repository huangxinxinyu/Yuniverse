import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'

type SiteCounts = { views: number; visitors: number }
type Store = { recordView: (path: string, visitorHash: string) => Promise<SiteCounts> }

async function loadApi() {
  const url = new URL('../api/site-metrics.ts', import.meta.url).href
  return import(/* @vite-ignore */ url).catch(() => null)
}

function viewRequest(path: string, visitorId = '00000000-0000-4000-8000-000000000001') {
  return new Request('https://www.xinyuhuang.space/api/site-metrics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, visitorId }),
  })
}

describe('site-wide metrics API', () => {
  it('loads as a standalone Node function module', () => {
    expect(() => execFileSync(
      process.execPath,
      ['--experimental-strip-types', '--input-type=module', '-e', "await import('./api/site-metrics.ts')"],
      { cwd: fileURLToPath(new URL('..', import.meta.url)) },
    )).not.toThrow()
  })

  it('adapts a relative Vercel request without crashing', async () => {
    const api = await loadApi()
    expect(api).not.toBeNull()
    if (!api) return

    const response = {
      body: '',
      statusCode: 0,
      send(body: string) { this.body = body },
      setHeader: vi.fn(),
      status(statusCode: number) { this.statusCode = statusCode; return this },
    }

    await api.default({
      body: { path: '/blog', visitorId: 'invalid' },
      headers: { 'content-type': 'application/json' },
      method: 'POST',
      url: '/api/site-metrics',
    }, response)

    expect(response.statusCode).toBe(400)
    expect(JSON.parse(response.body)).toEqual({ error: 'Invalid request' })
  })

  it('records an anonymous route view and returns site-wide counts', async () => {
    const api = await loadApi()
    expect(api).not.toBeNull()
    if (!api) return

    const recordView = vi.fn().mockResolvedValue({ views: 41, visitors: 17 })
    const handler = api.createSiteMetricsHandler({
      createStore: (): Store => ({ recordView }),
      hashVisitorId: () => 'hashed-visitor',
    })
    const response = await handler(viewRequest('/blog/hello-world'))

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(await response.json()).toEqual({ views: 41, visitors: 17 })
    expect(recordView).toHaveBeenCalledWith('/blog/hello-world', 'hashed-visitor')
  })

  it('rejects invalid paths and visitor IDs before storage', async () => {
    const api = await loadApi()
    expect(api).not.toBeNull()
    if (!api) return

    const createStore = vi.fn()
    const handler = api.createSiteMetricsHandler({
      createStore,
      hashVisitorId: () => 'hashed-visitor',
    })

    expect((await handler(viewRequest('//elsewhere'))).status).toBe(400)
    expect((await handler(viewRequest('/blog?token=secret'))).status).toBe(400)
    expect((await handler(viewRequest(`/blog/${'a'.repeat(150)}`))).status).toBe(400)
    expect((await handler(viewRequest('/blog', 'invalid'))).status).toBe(400)
    expect(createStore).not.toHaveBeenCalled()
  })

  it('uses one atomic Redis operation for short-window deduplication and unique visitors', async () => {
    const api = await loadApi()
    expect(api).not.toBeNull()
    if (!api) return

    const evalCommand = vi.fn().mockResolvedValue([41, 17])
    const store = api.createRedisSiteMetricsStore({ eval: evalCommand })

    await expect(store.recordView('/blog', 'hashed-visitor'))
      .resolves.toEqual({ views: 41, visitors: 17 })
    expect(evalCommand).toHaveBeenCalledTimes(1)
    const [script, keys, args] = evalCommand.mock.calls[0]
    expect(script).toContain("redis.call('PFADD'")
    expect(script).toContain("redis.call('PFCOUNT'")
    expect(keys).toEqual([
      'site:views',
      'site:visitors',
      'site:viewed:/blog:hashed-visitor',
    ])
    expect(args).toEqual(['hashed-visitor'])
  })

  it('returns a quiet error if the counter is unavailable', async () => {
    const api = await loadApi()
    expect(api).not.toBeNull()
    if (!api) return

    const handler = api.createSiteMetricsHandler({
      createStore: () => ({
        recordView: vi.fn().mockRejectedValue(new Error('private details')),
      }),
      hashVisitorId: () => 'hashed-visitor',
    })
    const response = await handler(viewRequest('/about'))

    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({ error: 'Metrics temporarily unavailable' })
  })
})
