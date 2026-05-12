import { SectionHeading } from '../components/SectionHeading'
import type { NoteItem, SectionSummary } from '../data/siteContent'

type NotesSectionProps = {
  section: SectionSummary
  notes: readonly NoteItem[]
}

export function NotesSection({ section, notes }: NotesSectionProps) {
  return (
    <section className="content-section split-section" id={section.id}>
      <SectionHeading {...section} />
      <div className="note-list">
        {notes.map((note) => (
          <article key={note.title}>
            <p>{note.date}</p>
            <h3>{note.title}</h3>
            <p>{note.summary}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
