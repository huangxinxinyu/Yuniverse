import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { collections } from '../src/content/siteContent'

describe('static assets', () => {
  it('uses the 宇 mark as the site favicon', () => {
    const indexHtml = readFileSync(join(process.cwd(), 'index.html'), 'utf8')

    expect(indexHtml).toContain('rel="icon" type="image/png" href="/favicon.png"')
    expect(existsSync(join(process.cwd(), 'public/favicon.png'))).toBe(true)
  })

  it('uses real remote movie artwork instead of generated placeholders', () => {
    const movieItems = collections.find((collection) => collection.id === 'movies')?.items ?? []

    for (const item of movieItems) {
      expect(item.visual).toMatch(
        /^https:\/\/(?:image\.tmdb\.org|media\.themoviedb\.org|www\.imfdb\.org)\/.+\.jpg$/,
      )
      expect(item.visual).not.toMatch(/^\/images\/movies\//)
      expect(item.visual).not.toMatch(/\.svg$/)
    }
  })
})
