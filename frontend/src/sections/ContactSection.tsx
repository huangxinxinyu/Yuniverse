import { SectionHeading } from '../components/SectionHeading'
import type { Profile, SectionSummary } from '../data/siteContent'

type ContactSectionProps = {
  section: SectionSummary
  profile: Profile
}

export function ContactSection({ section, profile }: ContactSectionProps) {
  return (
    <section className="content-section contact-section" id={section.id}>
      <SectionHeading {...section} />
      <div className="contact-panel">
        <p>{profile.intro}</p>
        <a className="text-command primary" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <span>{profile.location}</span>
      </div>
    </section>
  )
}
