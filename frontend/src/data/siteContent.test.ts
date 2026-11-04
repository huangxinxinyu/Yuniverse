import { describe, expect, it } from 'vitest'
import { blogPosts, navItems, profile, sectionSummaries } from './siteContent'

describe('site content', () => {
  it('publishes the X creators post', () => {
    expect(blogPosts[0]).toMatchObject({
      slug: 'x-creators-worth-following',
      title: '我在 X 上关注的 AI 博主：九个值得关注的人',
      status: 'published',
    })
  })

  it('publishes the nano-notebook dev log 13 post', () => {
    expect(blogPosts[1]).toMatchObject({
      slug: 'nano-notebook-dev-log-13',
      title: 'nano-notebook 开发日志 13：给研究 agent 的上下文做一次体检',
      status: 'published',
    })
  })

  it('publishes the nano-notebook dev log 12 post', () => {
    expect(blogPosts[2]).toMatchObject({
      slug: 'nano-notebook-dev-log-12',
      title: 'nano-notebook 开发日志 12：研究 agent 的“品味”能写进提示词吗',
      status: 'published',
    })
  })

  it('keeps navigation targets aligned with visible sections', () => {
    const summaryIds = sectionSummaries.map((section) => section.id)

    expect(navItems.map((item) => item.href)).toEqual(
      summaryIds.map((id) => `/${id}`),
    )
  })

  it('uses the real public profile content', () => {
    expect(profile.name).toBe('Yuniverse')
    expect(profile.displayName).toBe('黄新宇')
    expect(profile.email).toBe('xinyuhimself@gmail.com')
    expect(profile.tagline.toLowerCase()).not.toContain('mock')
  })

  it('publishes the Dokploy deployment selection post', () => {
    expect(blogPosts.map((post) => post.slug)).toContain(
      'dokploy-lightweight-paas-deployment-tradeoffs',
    )
  })

  it('publishes the agent memory governance internship post', () => {
    expect(blogPosts.map((post) => post.slug)).toContain(
      'internship-agent-memory-governance',
    )
  })

  it('publishes the Codex loop engineering post', () => {
    expect(blogPosts.map((post) => post.slug)).toContain(
      'codex-legendary-driver-loop-engineering',
    )
  })
})
