import { SectionHeading } from '../components/SectionHeading'
import { siteSections } from '../data/siteContent'

export function LifeSection() {
  const section = siteSections.life

  return (
    <section className="content-section split-section" id={section.id}>
      <SectionHeading {...section} />
      <ol className="timeline" aria-label="Life experience timeline">
        {section.events.map((event) => (
          <li key={`${event.year}-${event.title}`}>
            <div className="timeline-date">
              <time>{event.year}</time>
              <span>{event.place}</span>
            </div>
            <div>
              <h3>{event.title}</h3>
              <p>{event.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
