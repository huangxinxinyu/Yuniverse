import { useState } from 'react'
import { siteSections } from '../content/siteContent'

export function WorkPage() {
  const section = siteSections.work
  const [expandedWorkId, setExpandedWorkId] = useState(section.projects[0].id)

  return (
    <section aria-labelledby="work-title" className="content-section page-section" id="work">
      <p className="section-kicker">{section.kicker}</p>
      <h2 id="work-title">{section.title}</h2>
      <p>{section.body}</p>
      <div className="project-list">
        {section.projects.map((project) => {
          const isExpanded = project.id === expandedWorkId

          return (
            <article
              className={`mini-card project-card ${isExpanded ? 'is-expanded' : ''}`}
              key={project.id}
            >
              <button
                aria-controls={`work-details-${project.id}`}
                aria-expanded={isExpanded}
                className="card-trigger"
                onClick={() => setExpandedWorkId(project.id)}
                type="button"
              >
                <span>{project.title}</span>
                <h3>{project.featuredMetric}</h3>
              </button>
              <div className="work-details" id={`work-details-${project.id}`}>
                <span>{`${project.category} / ${project.year}`}</span>
                <p>{project.summary}</p>
                <ul>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
