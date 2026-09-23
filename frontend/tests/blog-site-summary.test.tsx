// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App'
import { BlogPage } from '../src/pages/BlogPage'
import { blogPosts } from '../src/content/siteContent'

describe('blog site summary and desk pet', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/blog')
    const values = new Map<string, string>()
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
        clear: () => values.clear(),
      },
    })
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('shows the real article count, site age, and site-wide counters beside the blog', () => {
    render(<BlogPage siteMetrics={{ views: 1241, visitors: 820 }} now={new Date('2026-09-23T12:00:00Z')} />)

    const summary = screen.getByRole('complementary', { name: '网站概览' })
    expect(summary.textContent).toContain(`文章数${blogPosts.length}`)
    expect(summary.textContent).toContain('建站天数402 天')
    expect(summary.textContent).toContain('访问量1,241')
    expect(summary.textContent).toContain('访客数820')
    expect(screen.getByRole('img', { name: '白色小狗趴在红色木碗里' })).toBeTruthy()
  })

  it('changes pet posture as the pointer moves around it and settles when it leaves', async () => {
    render(<BlogPage />)

    const pet = screen.getByTestId('blog-desk-pet')
    vi.spyOn(pet, 'getBoundingClientRect').mockReturnValue({
      left: 100, top: 100, right: 300, bottom: 300,
      width: 200, height: 200, x: 100, y: 100, toJSON: () => ({}),
    })

    fireEvent.pointerMove(window, { clientX: 240, clientY: 130, pointerType: 'mouse' })
    await waitFor(() => expect(pet.getAttribute('data-pose')).toBe('reach'))
    expect(pet.getAttribute('data-direction')).toBe('right')

    fireEvent.pointerMove(window, { clientX: 1000, clientY: 1000, pointerType: 'mouse' })
    await waitFor(() => expect(pet.getAttribute('data-pose')).toBe('rest'))
  })

  it('records a site view when the visitor opens a route', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ views: 41, visitors: 17 }),
    } as Response)
    vi.stubGlobal('fetch', fetchMock)

    render(<App />)

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(
      '/api/site-metrics',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"path":"/blog"'),
      }),
    ))
    expect(await screen.findByText('41')).toBeTruthy()
    expect(await screen.findByText('17')).toBeTruthy()
  })
})
