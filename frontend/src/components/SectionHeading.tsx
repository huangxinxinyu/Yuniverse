type SectionHeadingProps = {
  eyebrow: string
  title: string
  body?: string
  summary?: string
}

export function SectionHeading({ eyebrow, title, body, summary }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{body ?? summary}</p>
    </div>
  )
}
