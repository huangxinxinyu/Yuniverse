// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App'
import { getSiteContent } from '../src/content/siteContent'
import { blogPosts as basePosts } from '../src/content/posts'
import { resolveInitialLocale } from '../src/i18n/locale'

const hasChinese = /[一-鿿]/

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

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: createMemoryStorage(),
  })
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  window.history.replaceState({}, '', '/')
})

describe('bilingual site', () => {
  it('renders the English site when asked', () => {
    const html = renderToStaticMarkup(<App initialPath="/home" initialLocale="en" />)

    expect(html).toContain('aria-label="Primary navigation"')
    expect(html).toContain('View work')
    expect(html).toContain('Xinyu Huang')
    expect(html).toContain('aria-label="Contact"')
    expect(html).toContain('WeChat')
    expect(html).not.toContain('主导航')
  })

  it('marks the active language in the header toggle', () => {
    const zhHtml = renderToStaticMarkup(<App initialPath="/home" />)
    const enHtml = renderToStaticMarkup(<App initialPath="/home" initialLocale="en" />)

    expect(zhHtml).toContain('aria-label="中文" aria-pressed="true"')
    expect(zhHtml).toContain('aria-label="English" aria-pressed="false"')
    expect(enHtml).toContain('aria-label="English" aria-pressed="true"')
  })

  it('switches every visible label when the toggle is pressed', () => {
    render(<App initialPath="/work" />)

    expect(screen.getByRole('navigation', { name: '主导航' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: '精选作品' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'English' }))

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Selected work' })).toBeTruthy()
    expect(document.documentElement.lang).toBe('en')
  })

  it('gives every post an English title and summary', () => {
    for (const post of basePosts) {
      expect(post.en?.title, post.slug).toBeTruthy()
      expect(post.en?.excerpt, post.slug).toBeTruthy()
      expect(post.en?.title, post.slug).not.toMatch(hasChinese)
      expect(post.en?.excerpt, post.slug).not.toMatch(hasChinese)
      expect(post.en?.aiDisclosure ?? '', post.slug).not.toMatch(hasChinese)
    }
  })

  it('keeps the English blog index free of Chinese labels and tags', () => {
    const { blogCategories, blogPosts, blogSeries, blogTopics } = getSiteContent('en')

    for (const label of [
      ...blogCategories.map((item) => item.label),
      ...blogTopics.map((item) => item.label),
      ...blogSeries.map((item) => item.label),
      ...blogPosts.flatMap((post) => [post.title, post.excerpt, post.readingTime, ...post.tags]),
    ]) {
      expect(label).not.toMatch(hasChinese)
    }
  })

  it('shows translated post metadata and flags the Chinese body in English mode', () => {
    const html = renderToStaticMarkup(
      <App initialPath="/blog/jev-decision-model" initialLocale="en" />,
    )

    expect(html).toContain('>Jev: Taking Judgment Out of the LLM</h2>')
    expect(html).toContain('This article is written in Chinese.')
    expect(html).toContain('class="blog-post-body" lang="zh-CN"')
    expect(html).toContain('Back to blog')
  })

  it('does not show a language notice when the body matches the site language', () => {
    const html = renderToStaticMarkup(<App initialPath="/blog/jev-decision-model" />)

    expect(html).toContain('>Jev：把判断从 LLM 里拆出来</h2>')
    expect(html).not.toContain('blog-language-notice')
  })
})

describe('initial language', () => {
  const stubLanguages = (languages: string[]) =>
    vi.stubGlobal('navigator', { ...window.navigator, language: languages[0], languages })

  it('prefers the ?lang= query', () => {
    stubLanguages(['zh-CN'])
    window.localStorage.setItem('yuniverse:locale', 'zh')
    window.history.replaceState({}, '', '/blog?lang=en')

    expect(resolveInitialLocale()).toBe('en')
  })

  it('falls back to the saved choice', () => {
    stubLanguages(['en-US'])
    window.localStorage.setItem('yuniverse:locale', 'zh')

    expect(resolveInitialLocale()).toBe('zh')
  })

  it('falls back to the browser language', () => {
    stubLanguages(['en-US', 'zh-TW'])
    expect(resolveInitialLocale()).toBe('zh')

    stubLanguages(['en-US', 'fr-FR'])
    expect(resolveInitialLocale()).toBe('en')
  })
})
