import { useState } from 'react'
import { siteSections } from '../content/siteContent'

export function LifePage() {
  const section = siteSections.life
  const [activeLifeId, setActiveLifeId] = useState(section.events[0].id)

  return (
    <section aria-labelledby="life-title" className="content-section page-section" id="life">
      <p className="section-kicker">{section.kicker}</p>
      <h2 id="life-title">{section.title}</h2>
      <p>{section.body}</p>
      <ol className="timeline" aria-label="Life observations">
        {section.events.map((event) => {
          const isActive = event.id === activeLifeId

          return (
            <li key={event.id}>
              <button
                aria-controls={`life-panel-${event.id}`}
                aria-current={isActive ? 'step' : undefined}
                className="timeline-button"
                onClick={() => setActiveLifeId(event.id)}
                type="button"
              >
                <time>{event.date}</time>
                <span>{event.title}</span>
              </button>
              <div
                className="timeline-panel"
                hidden={!isActive}
                id={`life-panel-${event.id}`}
              >
                <p className="panel-label">{event.place}</p>
                <h3>{event.title}</h3>
                <p>{event.summary}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
