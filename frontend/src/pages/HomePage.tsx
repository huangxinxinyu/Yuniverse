import type { MouseEvent } from 'react'
import type { PageProps, RoutePath } from '../App'
import { useSiteContent } from '../content/useSiteContent'

export function HomePage({ onNavigate }: PageProps) {
  const { profile, sectionSummaries, ui } = useSiteContent()
  const handleClick =
    (href: RoutePath) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!onNavigate) {
        return
      }

      event.preventDefault()
      onNavigate(href)
    }

  return (
    <>
      <section className="hero-section home-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1 id="hero-title">
            {profile.name}
            <span>{profile.displayName}</span>
          </h1>
          <p className="hero-text">{profile.heroText}</p>
          <div className="hero-actions" aria-label={ui.home.primaryLinksAria}>
            <a className="text-command primary" href="/work" onClick={handleClick('/work')}>
              {ui.home.viewWork}
            </a>
            <a className="text-command secondary" href="/about" onClick={handleClick('/about')}>
              {ui.home.about}
            </a>
          </div>
        </div>

        <div className="signal-panel" aria-label={ui.home.snapshotAria}>
          {profile.signals.map((signal) => (
            <div key={signal.label}>
              <span className="panel-label">{signal.label}</span>
              <strong>{signal.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="portal-section" aria-labelledby="portal-title">
        <div>
          <p className="section-kicker">{ui.home.sectionsKicker}</p>
          <h2 id="portal-title">{ui.home.portalTitle}</h2>
        </div>
        <div className="portal-grid">
          {sectionSummaries.map((section) => {
            const href = `/${section.id}` as RoutePath

            return (
              <a
                className="mini-card portal-card"
                href={href}
                key={section.id}
                onClick={handleClick(href)}
              >
                <span>{section.eyebrow}</span>
                <h3>{section.title}</h3>
                <p>{section.summary}</p>
              </a>
            )
          })}
        </div>
      </section>
    </>
  )
}
