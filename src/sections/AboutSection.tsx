import { SectionHeading } from '../components/SectionHeading'
import { siteSections } from '../data/siteContent'
import type { SectionSummary } from '../data/siteContent'

type AboutSectionProps = {
  section?: SectionSummary
}

export function AboutSection({ section }: AboutSectionProps) {
  const about = siteSections.about
  const heading = section ?? about

  return (
    <section className="content-section split-section" id={heading.id}>
      <SectionHeading {...heading} />
      <div className="about-panel">
        <p className="about-lede">{about.intro}</p>
        <dl>
          {about.focusAreas.map((area) => (
            <div key={area}>
              <dt>Focus</dt>
              <dd>{area}</dd>
            </div>
          ))}
        </dl>
        <ul className="selected-links" aria-label="Selected links">
          {about.links.map((link) => (
            <li key={link.label}>
              <a href={link.href}>
                <strong>{link.label}</strong>
                <span>{link.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
