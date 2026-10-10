// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PostComments } from '../src/components/PostComments'
import { commentPersona } from '../src/lib/commentPersona'

const visitorId = '00000000-0000-4000-8000-000000000001'
const existingComment = {
  body: '第一条评论',
  createdAt: '2026-10-09T12:00:00.000Z',
  id: '00000000-0000-4000-8000-0000000000aa',
  persona: 3,
}

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

function jsonResponse(body: unknown, status = 200) {
  return {
    json: async () => body,
    ok: status >= 200 && status < 300,
    status,
  } as Response
}

describe('post comments', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createMemoryStorage(),
    })
    window.localStorage.setItem('yuniverse:visitor-id', visitorId)
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('lists comments and appends a new one', async () => {
    const newComment = { ...existingComment, body: '新评论', id: 'new', persona: 19 }
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ comments: [existingComment] }))
      .mockResolvedValueOnce(jsonResponse({ comment: newComment }, 201))
    vi.stubGlobal('fetch', fetchMock)

    render(<PostComments slug="jev-decision-model" />)

    expect(await screen.findByText('第一条评论')).toBeTruthy()
    expect(screen.getByRole('heading', { name: '评论（1）' })).toBeTruthy()
    expect(screen.getByText('害羞的狐狸')).toBeTruthy()
    expect(screen.getByText('匿名发言，会随机分配一个默认身份。')).toBeTruthy()
    expect(screen.queryByLabelText('昵称')).toBeNull()

    fireEvent.change(screen.getByLabelText('评论内容'), { target: { value: '新评论' } })
    fireEvent.click(screen.getByRole('button', { name: '发表评论' }))

    expect(await screen.findByText('新评论')).toBeTruthy()
    expect(screen.getByRole('heading', { name: '评论（2）' })).toBeTruthy()
    expect((screen.getByLabelText('评论内容') as HTMLTextAreaElement).value).toBe('')
    expect(screen.getByText('你的身份')).toBeTruthy()
    expect(screen.getAllByText('害羞的熊猫')).toHaveLength(2)
    expect(window.localStorage.getItem('yuniverse:comment-persona')).toBe('19')
    expect(fetchMock).toHaveBeenLastCalledWith(
      '/api/post-comments?slug=jev-decision-model',
      expect.objectContaining({
        body: JSON.stringify({ body: '新评论', visitorId, website: '' }),
        method: 'POST',
      }),
    )
  })

  it('tells the reader to slow down when rate limited', async () => {
    vi.stubGlobal('fetch', vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ comments: [] }))
      .mockResolvedValueOnce(jsonResponse({ error: 'Too many comments' }, 429)))

    render(<PostComments slug="jev-decision-model" />)

    expect(await screen.findByText('还没有评论，来说第一句吧。')).toBeTruthy()
    fireEvent.change(screen.getByLabelText('评论内容'), { target: { value: '再来一条' } })
    fireEvent.click(screen.getByRole('button', { name: '发表评论' }))

    expect((await screen.findByRole('alert')).textContent)
      .toBe('发得有点快，半分钟后再试吧。')
    expect((screen.getByLabelText('评论内容') as HTMLTextAreaElement).value).toBe('再来一条')
  })

  it('hides the form when comments cannot load', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))

    render(<PostComments slug="jev-decision-model" />)

    expect(await screen.findByText('评论暂时不可用。')).toBeTruthy()
    expect(screen.queryByRole('button', { name: '发表评论' })).toBeNull()
  })

  it('shows delete buttons only with an admin token', async () => {
    window.localStorage.setItem('yuniverse:comments-admin-token', 'secret-token')
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ comments: [existingComment] }))
      .mockResolvedValueOnce(jsonResponse({ deleted: true }))
    vi.stubGlobal('fetch', fetchMock)

    render(<PostComments slug="jev-decision-model" />)

    fireEvent.click(await screen.findByRole('button', { name: '删除' }))

    await waitFor(() => expect(screen.queryByText('第一条评论')).toBeNull())
    expect(fetchMock).toHaveBeenLastCalledWith(
      `/api/post-comments?slug=jev-decision-model&id=${existingComment.id}`,
      { headers: { Authorization: 'Bearer secret-token' }, method: 'DELETE' },
    )
  })

  it('has no delete buttons for regular readers', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      jsonResponse({ comments: [existingComment] }),
    ))

    render(<PostComments slug="jev-decision-model" />)

    expect(await screen.findByText('第一条评论')).toBeTruthy()
    expect(screen.queryByRole('button', { name: '删除' })).toBeNull()
  })
})

describe('comment personas', () => {
  it('maps a seed to a localized default name and avatar', () => {
    expect(commentPersona(3, 'zh')).toMatchObject({ emoji: '🦊', name: '害羞的狐狸' })
    expect(commentPersona(19, 'en')).toMatchObject({ emoji: '🐼', name: 'Shy Panda' })
    expect(commentPersona(4_294_967_295, 'zh').name).toBeTruthy()
  })
})
