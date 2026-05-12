import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { BlogPage } from '../src/pages/BlogPage'
import { blogCategories, blogPosts, siteSections } from '../src/content/siteContent'

describe('blog page', () => {
  const html = renderToStaticMarkup(<BlogPage />)

  it('renders a dedicated blog index from real planning data', () => {
    expect(html).toContain('data-page="blog"')
    expect(html).toContain('aria-labelledby="blog-title"')
    expect(siteSections.blog.summary.toLowerCase()).not.toContain('mock')

    for (const post of siteSections.blog.posts) {
      expect(html).toContain(post.title)
      expect(html).toContain(post.excerpt)
    }
  })

  it('shows categories, tags, and an accessible featured post area', () => {
    for (const category of blogCategories) {
      expect(html).toContain(`data-category="${category.id}"`)
      expect(html).toContain(category.label)
    }

    for (const post of blogPosts) {
      for (const tag of post.tags) {
        expect(html).toContain(tag)
      }
    }

    expect(html).toContain('aria-labelledby="featured-post-title"')
    expect(html).toContain('data-featured="true"')
  })

  it('keeps an empty future-state ready for filters with no matches', () => {
    expect(html).toContain('role="status"')
    expect(html).toContain(siteSections.blog.emptyState)
  })
})
