import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { navigationItems, siteSections } from '../src/content/siteContent'

const requiredRoutes = ['/', '/about', '/work', '/life', '/blog', '/collection'] as const

describe('multi-page route contract', () => {
  it('renders shared navigation with links to every required route', () => {
    const html = renderToStaticMarkup(<App initialPath="/" />)

    expect(html).toContain('aria-label="Primary navigation"')
    expect(html).toContain('href="/"')

    for (const item of navigationItems) {
      expect(html).toContain(`href="/${item.href.slice(1)}"`)
    }
  })

  it.each(requiredRoutes)('renders %s as its own page', (route) => {
    const html = renderToStaticMarkup(<App initialPath={route} />)

    expect(html).toContain(`data-route="${route}"`)
    expect(html).toContain('class="page-shell"')
  })

  it('keeps home as a portal instead of rendering every full section', () => {
    const html = renderToStaticMarkup(<App initialPath="/" />)

    for (const section of Object.values(siteSections)) {
      expect(html).toContain(`href="/${section.id}"`)
      expect(html).not.toContain(`id="${section.id}"`)
    }
  })

  it('renders each content route with only its section landmark', () => {
    for (const section of Object.values(siteSections)) {
      const html = renderToStaticMarkup(<App initialPath={`/${section.id}`} />)

      expect(html).toContain(`id="${section.id}"`)
      expect(html).toContain(`id="${section.id}-title"`)

      for (const otherSection of Object.values(siteSections)) {
        if (otherSection.id !== section.id) {
          expect(html).not.toContain(`id="${otherSection.id}"`)
        }
      }
    }
  })
})
