import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { collections } from '../src/content/siteContent'

describe('static assets', () => {
  it('uses the 宇 mark as the site favicon', () => {
    const indexHtml = readFileSync(join(process.cwd(), 'index.html'), 'utf8')

    expect(indexHtml).toContain('rel="icon" type="image/png" href="/favicon.png"')
    expect(indexHtml).toContain('rel="apple-touch-icon" href="/favicon.png"')
    expect(indexHtml).not.toMatch(/href="\/favicon\.svg"/)
    expect(existsSync(join(process.cwd(), 'public/favicon.png'))).toBe(true)
    expect(existsSync(join(process.cwd(), 'public/favicon.svg'))).toBe(false)
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

  it('publishes search crawler metadata for the production domain', () => {
    const indexHtml = readFileSync(join(process.cwd(), 'index.html'), 'utf8')
    const robotsPath = join(process.cwd(), 'public/robots.txt')
    const sitemapPath = join(process.cwd(), 'public/sitemap.xml')

    expect(existsSync(robotsPath)).toBe(true)
    expect(existsSync(sitemapPath)).toBe(true)

    const robotsTxt = readFileSync(robotsPath, 'utf8')
    const sitemapXml = readFileSync(sitemapPath, 'utf8')

    expect(indexHtml).toContain('<title>Xinyu Huang | Yuniverse Lab</title>')
    expect(indexHtml).toContain(
      '<meta name="description" content="Xinyu Huang\'s personal site: AI projects, writing, software experiments, and Yuniverse Lab." />',
    )
    expect(indexHtml).toContain(
      '<meta name="google-site-verification" content="AjQSF08mJksHY8R0OE1w0WOLjEJQJozVO7X8HGEvfIQ" />',
    )
    expect(indexHtml).toContain('<link rel="canonical" href="https://www.xinyuhuang.space/" />')

    expect(robotsTxt).toContain('User-agent: *')
    expect(robotsTxt).toContain('Allow: /')
    expect(robotsTxt).toContain('Sitemap: https://www.xinyuhuang.space/sitemap.xml')

    for (const path of ['/', '/home', '/about', '/work', '/life', '/blog', '/collection']) {
      expect(sitemapXml).toContain(`<loc>https://www.xinyuhuang.space${path}</loc>`)
    }
  })
})
