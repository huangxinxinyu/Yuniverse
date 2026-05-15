import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
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

  it('does not expose draft, planned, or published status filters to readers', () => {
    expect(html).not.toContain('aria-label="Blog status filters"')
    expect(html).not.toContain('Drafts')
    expect(html).not.toContain('Planned')
    expect(html).not.toContain('Published')
  })

  it('does not render a future-state placeholder when a filter has no matches', () => {
    const futureHtml = renderToStaticMarkup(<BlogPage initialFilter="future" />)

    expect(futureHtml).not.toContain('role="status"')
    expect(futureHtml).not.toContain(siteSections.blog.emptyState)
    expect(futureHtml).not.toContain('Future state')
    expect(futureHtml).not.toContain('href="/blog/hello-world"')
  })

  it('links the blog index to the readable articles', () => {
    expect(html).toContain('href="/blog/multica-local-agent-workflow"')
    expect(html).toContain('href="/blog/internship-agent-infrastructure-notes"')
    expect(html).toContain('href="/blog/hello-world"')
    expect(html).toContain('Read article')
    expect(blogPosts[0].title).toBe('Multica：把本地 AI Coding Agent 变成可管理的长任务')
    expect(blogPosts[0].status).toBe('published')
  })

  it('keeps the published blog articles in blog data', () => {
    expect(blogPosts.map((post) => post.slug)).toEqual([
      'multica-local-agent-workflow',
      'internship-agent-infrastructure-notes',
      'hello-world',
    ])
    expect(html).not.toContain('Bachelor and Postgraduate Study')
    expect(html).not.toContain('Software Engineering Notes')
    expect(html).not.toContain('Fitness, Films, and Fun')
    expect(html).not.toContain('Work in Progress')
  })

  it('renders the Hello World article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(<App initialPath="/blog/hello-world" />)

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('Hello World')
    expect(articleHtml).toContain('hello world')
    expect(articleHtml).toContain('这是 ai 发布的内容')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the internship Agent Infrastructure article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/internship-agent-infrastructure-notes" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('实习记录：做 AI Agent Infrastructure 的阶段小结')
    expect(articleHtml).toContain('Agent Infrastructure')
    expect(articleHtml).toContain('Vibe Coding')
    expect(articleHtml).not.toContain('上海食物主义')
    expect(articleHtml).toContain('Back to blog')
  })

  it('renders the Multica local agent workflow article as a readable page', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/multica-local-agent-workflow" />,
    )

    expect(articleHtml).toContain('data-page="blog-post"')
    expect(articleHtml).toContain('Multica：把本地 AI Coding Agent 变成可管理的长任务')
    expect(articleHtml).toContain('WSL')
    expect(articleHtml).toContain('multica daemon start')
    expect(articleHtml).toContain('Yuniverse')
    expect(articleHtml).toContain('指挥官')
    expect(articleHtml).toContain('一边实习')
    expect(articleHtml).not.toContain('cd ~/code/yuniverse/frontend')
    expect(articleHtml).not.toContain('git push origin main:master')
  })

  it('renders markdown-style command blocks in technical blog posts', () => {
    const articleHtml = renderToStaticMarkup(
      <App initialPath="/blog/multica-local-agent-workflow" />,
    )

    expect(articleHtml).toContain('<h3>WSL 下的本地流程</h3>')
    expect(articleHtml).toContain('<pre class="blog-code-block"')
    expect(articleHtml).toContain('<code class="language-bash">')
    expect(articleHtml).toContain('multica issue create --title &quot;Build a personal website&quot;')
    expect(articleHtml).toContain('multica issue run-messages')
  })
})
