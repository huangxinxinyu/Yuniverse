import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { AboutPage } from '../src/pages/AboutPage'
import { aboutPageContent } from '../src/content/siteContent'

describe('about page', () => {
  const html = renderToStaticMarkup(<AboutPage />)

  it('renders as a real public identity page', () => {
    expect(html).toContain('aria-labelledby="about-page-title"')
    expect(html).toContain(aboutPageContent.title)
    expect(html).toContain('悉尼大学')
    expect(html).toContain('UCSD')
    expect(aboutPageContent.statusNotice.toLowerCase()).not.toContain('mock')
  })

  it('renders each required content block from centralized data', () => {
    expect(html).toContain(aboutPageContent.intro.heading)
    expect(html).toContain(aboutPageContent.values.heading)
    expect(html).toContain(aboutPageContent.craft.heading)

    for (const value of aboutPageContent.values.items) {
      expect(html).toContain(value.label)
    }

    for (const tool of aboutPageContent.craft.tools) {
      expect(html).toContain(tool.name)
    }
  })

  it('renders restrained personal detail controls with one active default item', () => {
    expect(html).toContain('aria-label="Personal detail notes"')
    expect(html).not.toContain('interest-orbit')
    expect(html).not.toContain('orbit-core')

    for (const detail of aboutPageContent.personalDetails.items) {
      expect(html).toContain(`aria-controls="detail-panel-${detail.id}"`)
      expect(html).toContain(detail.label)
    }

    expect(html).toContain('aria-pressed="true"')
  })

  it('models contact email and GitHub as dedicated links instead of plain detail text', () => {
    const contact = aboutPageContent.personalDetails.items.find(
      (detail) => detail.id === 'contact',
    )

    expect(html).toContain('href="mailto:xinyuhimself@gmail.com"')
    expect(html).toContain('href="https://github.com/huangxinxinyu"')
    expect(html).toContain('detail-link-icon')
    expect(contact?.detail).not.toContain('xinyuhimself@gmail.com')
    expect(contact?.detail).not.toContain('github.com/huangxinxinyu')
    expect(contact?.links).toEqual([
      {
        label: 'Email',
        href: 'mailto:xinyuhimself@gmail.com',
        description: 'xinyuhimself@gmail.com',
        icon: 'mail',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/huangxinxinyu',
        description: 'github.com/huangxinxinyu',
        icon: 'github',
      },
    ])
  })
})
