import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from '../src/App'
import { navigationItems, siteSections } from '../src/content/siteContent'

const requiredRoutes = ['/home', '/about', '/work', '/blog', '/collection'] as const

describe('multi-page route contract', () => {
  it('serves the immersive intro at the public root before the normal home page', () => {
    const html = renderToStaticMarkup(<App initialPath="/" />)

    expect(html).toContain('data-route="/intro"')
    expect(html).toContain('Follow the comet')
    expect(html).toContain('href="/home"')
    expect(html).not.toContain('aria-label="Primary navigation"')
  })

  it('renders shared navigation with links to every required route', () => {
    const html = renderToStaticMarkup(<App initialPath="/home" />)

    expect(html).toContain('aria-label="Primary navigation"')
    expect(html).toContain('href="/home"')

    for (const item of navigationItems) {
      expect(html).toContain(`href="/${item.href.slice(1)}"`)
    }

    expect(html).not.toContain('href="/life"')
  })

  it('does not expose the removed Life route', () => {
    const html = renderToStaticMarkup(<App initialPath="/life" />)

    expect(html).toContain('data-route="/intro"')
    expect(html).not.toContain('data-route="/life"')
  })

  it.each(requiredRoutes)('renders %s as its own page', (route) => {
    const html = renderToStaticMarkup(<App initialPath={route} />)

    expect(html).toContain(`data-route="${route}"`)
    expect(html).toContain('class="page-shell"')
    expect(html).toContain('aria-label="Contact"')
  })

  it('renders the shared contact footer with every requested channel', () => {
    const html = renderToStaticMarkup(<App initialPath="/work" />)

    for (const label of ['WeChat', 'Email', 'Phone', 'GitHub', 'Douyin', 'RedNote']) {
      expect(html).toContain(label)
    }

    expect(html).toContain('XinyuHimself')
    expect(html).toContain('href="mailto:xinyuhimself@gmail.com"')
    expect(html).toContain('href="tel:+8613567277836"')
    expect(html).toContain('href="https://github.com/huangxinxinyu"')
    expect(html).toContain('@新新 man · 57967116619')
    expect(html).toContain('天目路耐面王 · 1475758150')
  })

  it('keeps home as a portal instead of rendering every full section', () => {
    const html = renderToStaticMarkup(<App initialPath="/home" />)

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
