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

  it('frames the page as a living archive instead of replaceable draft content', () => {
    expect(html).toContain('A living archive')
    expect(html).toContain(
      'Yuniverse grows with me—one project, note, and moment at a time.',
    )
    expect(html).not.toContain('Replaceable content')
    expect(html).not.toContain('current public draft')
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

  it('keeps contact details out of the About detail controls', () => {
    expect(aboutPageContent.personalDetails.items.some((detail) => detail.id === 'contact')).toBe(
      false,
    )
    expect(html).not.toContain('aria-controls="detail-panel-contact"')
    expect(html).not.toContain('Personal details and contact')
  })
})
