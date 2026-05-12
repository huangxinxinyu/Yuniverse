import { useState } from 'react'
import { aboutPageContent } from '../content/siteContent'

export function AboutPage() {
  const [activeDetailId, setActiveDetailId] = useState(
    aboutPageContent.personalDetails.items[0].id,
  )
  const activeDetail =
    aboutPageContent.personalDetails.items.find(
      (detail) => detail.id === activeDetailId,
    ) ?? aboutPageContent.personalDetails.items[0]

  return (
    <section className="about-page-layout page-section" id="about" aria-labelledby="about-title">
      <span className="sr-only" id="about-title">
        About
      </span>
      <div className="about-hero-panel" aria-labelledby="about-page-title">
        <div className="about-hero-copy">
          <p className="section-kicker">{aboutPageContent.eyebrow}</p>
          <h1 className="about-page-title" id="about-page-title">
            {aboutPageContent.title}
          </h1>
          <p className="about-page-subtitle">{aboutPageContent.subtitle}</p>
        </div>
        <aside className="about-notice" aria-label="Content status notice">
          <span className="panel-label">Replaceable content</span>
          <p>{aboutPageContent.statusNotice}</p>
        </aside>
      </div>

      <div className="about-section-stack">
        <article className="about-panel">
          <div>
            <p className="section-kicker">01 / Intro</p>
            <h2>{aboutPageContent.intro.heading}</h2>
          </div>
          <div className="about-panel-copy">
            <p>{aboutPageContent.intro.body}</p>
            <dl className="coordinate-list">
            {aboutPageContent.intro.coordinates.map((coordinate) => (
              <div key={coordinate.label}>
                <dt>{coordinate.label}</dt>
                <dd>{coordinate.text}</dd>
              </div>
            ))}
            </dl>
          </div>
        </article>

        <article className="about-panel">
          <div>
            <p className="section-kicker">02 / Values</p>
            <h2>{aboutPageContent.values.heading}</h2>
            <p>{aboutPageContent.values.body}</p>
          </div>
          <div className="value-grid">
            {aboutPageContent.values.items.map((value) => (
              <section className="mini-card" key={value.label}>
                <span>{value.label}</span>
                <p>{value.text}</p>
              </section>
            ))}
          </div>
        </article>

        <article className="about-panel">
          <div>
            <p className="section-kicker">03 / Craft</p>
            <h2>{aboutPageContent.craft.heading}</h2>
            <p>{aboutPageContent.craft.body}</p>
          </div>
          <div className="tool-list">
            {aboutPageContent.craft.tools.map((tool) => (
              <div className="tool-row" key={tool.name}>
                <strong>{tool.name}</strong>
                <span>{tool.role}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="about-panel about-details-section">
          <div className="details-copy">
            <p className="section-kicker">04 / Details</p>
            <h2>{aboutPageContent.personalDetails.heading}</h2>
            <p>{aboutPageContent.personalDetails.body}</p>
          </div>
          <div className="detail-note-group" aria-label="Personal detail notes">
            <div className="detail-chip-list">
              {aboutPageContent.personalDetails.items.map((detail) => {
                const isActive = detail.id === activeDetailId

                return (
                  <button
                    aria-controls={`detail-panel-${detail.id}`}
                    aria-pressed={isActive}
                    className="detail-chip"
                    key={detail.id}
                    onClick={() => setActiveDetailId(detail.id)}
                    type="button"
                  >
                    <span>{detail.label}</span>
                    <small>{detail.meta}</small>
                  </button>
                )
              })}
            </div>
            <div className="detail-panel" id={`detail-panel-${activeDetail.id}`} role="status">
              <span className="panel-label">{activeDetail.label}</span>
              <p>{activeDetail.detail}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
