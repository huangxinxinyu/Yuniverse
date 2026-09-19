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
                <span>{`${project.kind} / ${project.status}`}</span>
                <h3>{project.title}</h3>
              </button>
              <div className="work-details" id={`work-details-${project.id}`}>
                <span>{`${project.role} / ${project.year}`}</span>
                <p>{project.summary}</p>
                {project.highlights.length > 0 ? (
                  <ul className="project-highlights" aria-label={`${project.title} highlights`}>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
                <ul className="project-tags" aria-label={`${project.title} technologies and topics`}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {project.links.length > 0 ? (
                  <div className="project-links" aria-label={`${project.title} links`}>
                    {project.links.map((link) => {
                      const isExternal = link.href.startsWith('http')

                      return (
                        <a
                          href={link.href}
                          key={link.href}
                          rel={isExternal ? 'noreferrer' : undefined}
                          target={isExternal ? '_blank' : undefined}
                        >
                          {link.label} <span aria-hidden="true">↗</span>
                        </a>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
