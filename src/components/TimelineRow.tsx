type TimelineRowProps = {
  year: string
  place: string
  title: string
  note: string
}

export function TimelineRow({ year, place, title, note }: TimelineRowProps) {
  return (
    <li className="timeline-row">
      <div className="timeline-marker" aria-hidden="true" />
      <div className="timeline-date">
        <span>{year}</span>
        <small>{place}</small>
      </div>
      <div className="timeline-copy">
        <h3>{title}</h3>
        <p>{note}</p>
      </div>
    </li>
  )
}
