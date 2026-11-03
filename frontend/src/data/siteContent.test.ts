import { describe, expect, it } from 'vitest'
import { blogPosts, navItems, profile, sectionSummaries } from './siteContent'

describe('site content', () => {
  it('publishes the nano-notebook dev log 12 post', () => {
    expect(blogPosts[0]).toMatchObject({
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
