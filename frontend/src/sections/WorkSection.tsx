import { SectionHeading } from '../components/SectionHeading'
import { siteSections, workItems } from '../data/siteContent'
import type { SectionSummary, WorkItem } from '../data/siteContent'

type WorkSectionProps = {
  section?: SectionSummary
  items?: readonly WorkItem[]
}

export function WorkSection({ section, items }: WorkSectionProps) {
  const heading = section ?? siteSections.work
  const visibleItems = items ?? workItems

  return (
    <section className="content-section" id={heading.id}>
      <SectionHeading {...heading} />
      <div className="card-grid">
        {visibleItems.map((item) => (
          <article className="project-card" key={item.title}>
            <p>{item.meta}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul aria-label={`${item.title} tags`}>
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
