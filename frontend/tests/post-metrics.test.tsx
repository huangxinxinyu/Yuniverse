// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BlogPostPage } from '../src/pages/BlogPostPage'

const visitorId = '00000000-0000-4000-8000-000000000001'
const visitorStorageKey = 'yuniverse:visitor-id'

function createMemoryStorage(): Storage {
  const values = new Map<string, string>()

  return {
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    get length() {
      return values.size
    },
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  }
}

function jsonResponse(body: unknown) {
  return {
    json: async () => body,
    ok: true,
  } as Response
}

describe('anonymous post metrics', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createMemoryStorage(),
    })
    window.localStorage.clear()
    window.localStorage.setItem(visitorStorageKey, visitorId)
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('records one anonymous view and renders the returned counts', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({ liked: false, likes: 4, views: 12 }),
    )
    vi.stubGlobal('fetch', fetchMock)

    render(<BlogPostPage slug="jev-decision-model" />)

    expect(await screen.findByText('12 views')).toBeTruthy()
    expect(screen.getByText('4 likes')).toBeTruthy()
    expect(screen.getByRole('group', { name: 'Post engagement' })).toBeTruthy()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/post-metrics?slug=jev-decision-model',
      expect.objectContaining({
        body: JSON.stringify({ action: 'view', visitorId }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }),
    )
  })

  it('toggles the current browser like without reloading the article', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({ liked: false, likes: 4, views: 12 }),
      )
      .mockResolvedValueOnce(
        jsonResponse({ liked: true, likes: 5, views: 12 }),
      )
    vi.stubGlobal('fetch', fetchMock)

    render(<BlogPostPage slug="jev-decision-model" />)

    const likeButton = await screen.findByRole('button', {
      name: 'Like this post',
    })
    await waitFor(() => expect(likeButton.getAttribute('aria-pressed')).toBe('false'))

    fireEvent.click(likeButton)

    await waitFor(() => expect(likeButton.getAttribute('aria-pressed')).toBe('true'))
    expect(screen.getByText('5 likes')).toBeTruthy()
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock).toHaveBeenLastCalledWith(
      '/api/post-metrics?slug=jev-decision-model',
      expect.objectContaining({
        body: JSON.stringify({ action: 'toggle-like', visitorId }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }),
    )
  })

  it('keeps the article readable when the metrics service is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))

    render(<BlogPostPage slug="jev-decision-model" />)

    await waitFor(() => {
      expect(screen.getByRole('group', { name: 'Post engagement' }).dataset.status)
        .toBe('unavailable')
    })

    expect(screen.getByRole('heading', { name: 'Jev：把判断从 LLM 里拆出来' }))
      .toBeTruthy()
    expect(screen.getByRole('button', { name: 'Like this post' }).hasAttribute('disabled'))
      .toBe(true)
  })

  it('keeps the last counts when a like request fails', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({ liked: false, likes: 4, views: 12 }),
      )
      .mockRejectedValueOnce(new Error('offline'))
    vi.stubGlobal('fetch', fetchMock)

    render(<BlogPostPage slug="jev-decision-model" />)

    const likeButton = await screen.findByRole('button', {
      name: 'Like this post',
    })
    await waitFor(() => expect(likeButton.hasAttribute('disabled')).toBe(false))
    fireEvent.click(likeButton)

    await waitFor(() => expect(likeButton.hasAttribute('disabled')).toBe(false))
    expect(likeButton.getAttribute('aria-pressed')).toBe('false')
    expect(screen.getByText('4 likes')).toBeTruthy()
  })

  it('uses an ephemeral anonymous ID when browser storage is unavailable', async () => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: () => {
          throw new Error('storage blocked')
        },
      },
    })
    vi.stubGlobal('crypto', { randomUUID: () => visitorId })
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({ liked: false, likes: 4, views: 12 }),
    )
    vi.stubGlobal('fetch', fetchMock)

    render(<BlogPostPage slug="jev-decision-model" />)

    expect(await screen.findByText('12 views')).toBeTruthy()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/post-metrics?slug=jev-decision-model',
      expect.objectContaining({
        body: JSON.stringify({ action: 'view', visitorId }),
      }),
    )
  })
})
