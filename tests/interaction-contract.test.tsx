import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import App from '../src/App'
import { blogFilters, collections, siteSections } from '../src/content/siteContent'

describe('interactive section contract', () => {
  const homeHtml = renderToStaticMarkup(<App initialPath="/" />)
  const css = readFileSync(new URL('../src/App.css', import.meta.url), 'utf8')
  const globalCss = readFileSync(
    new URL('../src/index.css', import.meta.url),
    'utf8',
  )

  it('keeps a restrained decorative layer hidden from assistive technology', () => {
    expect(homeHtml).toContain('class="quiet-layer" aria-hidden="true"')
  })

  it('uses restrained decorative layers without orbit, star-field, or cursor theatrics', () => {
    expect(homeHtml).toContain('class="quiet-layer" aria-hidden="true"')
    expect(homeHtml).not.toContain('rocket-cursor')
    expect(homeHtml).not.toContain('class="orbit')
    expect(homeHtml).not.toContain('class="star"')
    expect(css).toContain('.quiet-layer')
    expect(css).not.toContain('.rocket-cursor')
    expect(css).not.toContain('.orbit {')
    expect(css).not.toContain('.star {')
    expect(css).not.toContain('rocket-flame')
  })

  it('uses a restrained cosmic atmosphere without literal stars or black-hole imagery', () => {
    expect(css).toContain('.quiet-layer::before')
    expect(css).toContain('.quiet-layer::after')
    expect(css).toContain('ellipse at 74% 18%')
    expect(css).toContain('border: 1px solid')
    expect(css).not.toContain('interstellar-black-hole')
    expect(css).not.toContain('star-field')
  })

  it('labels the primary content sections for landmark navigation', () => {
    for (const section of Object.values(siteSections)) {
      const html = renderToStaticMarkup(<App initialPath={`/${section.id}`} />)

      expect(html).toContain(`aria-labelledby="${section.id}-title"`)
      expect(html).toContain(`id="${section.id}-title"`)
    }
  })

  it('renders the 宇 mark in the navbar identity', () => {
    expect(homeHtml).toContain('class="identity-mark"')
    expect(homeHtml).toContain('src="/favicon.png"')
    expect(homeHtml).toContain('alt=""')
    expect(css).toContain('.identity-mark img')
  })

  it('disables continuous motion and smooth scrolling for reduced-motion users', () => {
    const reducedMotionCss = css.match(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*?\n}/,
    )?.[0]

    expect(reducedMotionCss).toContain('animation: none')
    expect(reducedMotionCss).toContain('transition: none')
    expect(reducedMotionCss).toContain('scroll-behavior: auto')
  })

  it('reserves space for fixed-header anchors and touch-sized controls', () => {
    expect(css).toContain('scroll-margin-top:')
    expect(css).toContain('min-height: 44px')
  })

  it('uses a quiet modern control language instead of legacy pill buttons', () => {
    const homeHtml = renderToStaticMarkup(<App initialPath="/" />)

    expect(homeHtml).toContain('class="text-command primary"')
    expect(homeHtml).toContain('class="text-command secondary"')
    expect(css).toContain('--control-active:')
    expect(css).toContain('.text-command')
    expect(css).toContain('.filter-button::after')
    expect(css).toContain('.tab-button::after')
    expect(css).not.toContain('border-radius: 999px')
    expect(css).not.toContain('background: color-mix(in srgb, var(--surface) 58%, transparent)')
  })

  it('defines scoped visual theme tokens used by the app stylesheet', () => {
    expect(css).toContain('--text-strong:')
    expect(css).toContain('--text-muted:')
    expect(css).toContain('--line:')
    expect(css).toContain('--surface:')
  })

  it('keeps the dark theme while covering the full routed page background', () => {
    expect(globalCss).toContain('color-scheme: light dark;')
    expect(globalCss).toContain('@media (prefers-color-scheme: dark)')
    expect(globalCss).toContain('--bg: #111315;')
    expect(css).toContain('@media (prefers-color-scheme: dark)')
    expect(css).toContain('--bg: #151613;')
    expect(css).toContain('min-height: 100svh;')
    expect(css).toContain('.page-shell[data-route]:not([data-route="/"])')
    expect(css).toContain('min-height: calc(100svh - 72px);')
    expect(css).toContain('box-shadow: 0 0 0 100vmax')
    expect(css).toContain('clip-path: inset(0 -100vmax);')
    expect(css).toContain('background:')
  })

  it('renders work items as disclosure controls', () => {
    const html = renderToStaticMarkup(<App initialPath="/work" />)

    for (const project of siteSections.work.projects) {
      expect(html).toContain(`aria-controls="work-details-${project.id}"`)
      expect(html).toContain(`id="work-details-${project.id}"`)
    }

    expect(html).toContain('aria-expanded="true"')
  })

  it('renders the life timeline with selectable focus controls', () => {
    const html = renderToStaticMarkup(<App initialPath="/life" />)

    for (const event of siteSections.life.events) {
      expect(html).toContain(`aria-controls="life-panel-${event.id}"`)
      expect(html).toContain(`id="life-panel-${event.id}"`)
    }

    expect(html).toContain('aria-current="step"')
  })

  it('renders blog filters with an accessible featured state', () => {
    const html = renderToStaticMarkup(<App initialPath="/blog" />)

    for (const filter of blogFilters) {
      expect(html).toContain(`data-filter="${filter.id}"`)
    }

    expect(html).toContain('Featured')
    expect(html).toContain('aria-pressed="true"')
  })

  it('renders collection tabs and picture gallery controls', () => {
    const html = renderToStaticMarkup(<App initialPath="/collection" />)

    expect(html).toContain('role="tablist"')
    expect(html).not.toContain('tabindex="-1"')

    for (const collection of collections) {
      expect(html).toContain(`id="collection-tab-${collection.id}"`)
      expect(html).toContain(`id="collection-panel-${collection.id}"`)
    }

    expect(html).toContain('aria-haspopup="dialog"')
    expect(html).toContain('Open picture')
  })

  it('renders a dedicated collection page for the /collection route', () => {
    const collectionHtml = renderToStaticMarkup(<App initialPath="/collection" />)

    expect(collectionHtml).toContain('data-page="collection"')
    expect(collectionHtml).toContain('aria-label="Collection media tabs"')
    expect(collectionHtml).toContain('aria-label="Collection view filters"')
    expect(collectionHtml).toContain('Albums')
    expect(collectionHtml).toContain('Playlists')
    expect(collectionHtml).not.toContain('Tracks')
    expect(collectionHtml).not.toContain('Watchlist')
    expect(collectionHtml).not.toContain('Favorites')
    expect(collectionHtml).toContain('Gallery')
    expect(collectionHtml).toContain('aria-haspopup="dialog"')
  })

  it('renders music collection entries as a four-column artwork grid', () => {
    const collectionHtml = renderToStaticMarkup(<App initialPath="/collection" />)

    expect(collectionHtml).toContain('class="collection-list music-artwork-grid"')
    expect(collectionHtml).toContain('class="album-art-card"')
    expect(collectionHtml).toContain('src="/images/albums/')
    expect(collectionHtml).not.toContain('class="album-meta"')
    expect(collectionHtml).not.toContain('class="album-note"')
    expect(css).toContain('.music-artwork-grid')
    expect(css).toContain('grid-template-columns: repeat(4, minmax(0, 1fr))')
    expect(css).toContain('aspect-ratio: 1')
  })

  it('renders movie collection entries as a poster-only artwork grid', () => {
    const collectionHtml = renderToStaticMarkup(<App initialPath="/collection" />)

    expect(collectionHtml).toContain('class="collection-list movie-artwork-grid"')
    expect(collectionHtml).toContain('class="movie-poster-card"')
    expect(collectionHtml).toContain('src="https://image.tmdb.org/')
    expect(collectionHtml).not.toContain('class="movie-meta"')
    expect(collectionHtml).not.toContain('class="movie-note"')
    expect(css).toContain('.movie-artwork-grid')
    expect(css).toContain('grid-template-columns: repeat(4, minmax(0, 1fr))')
    expect(css).toContain('.movie-poster')
    expect(css).toContain('aspect-ratio: 2 / 3')
  })
})
