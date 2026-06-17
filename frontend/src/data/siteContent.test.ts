import { describe, expect, it } from 'vitest'
import { blogPosts, navItems, profile, sectionSummaries } from './siteContent'

describe('site content', () => {
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
})
