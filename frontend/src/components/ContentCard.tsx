import type { ReactNode } from 'react'

type ContentCardProps = {
  children: ReactNode
  className?: string
}

export function ContentCard({ children, className = '' }: ContentCardProps) {
  return <article className={`content-card ${className}`.trim()}>{children}</article>
}
