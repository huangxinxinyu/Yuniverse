export type ContentLink = {
  label: string
  href: string
}

export type ProfileLink = ContentLink

export type Profile = {
  displayName: string
  romanizedName: string
  brandName: string
  shortBio: string
  locationLabel: string
  focusAreas: readonly string[]
  links: readonly ProfileLink[]
}

export type WorkItem = {
  id: string
  title: string
  kind: 'Product' | 'Open source' | 'Personal website' | 'Research'
  status: 'In development' | 'Planned' | 'Ongoing' | 'Preprint under revision'
  role: string
  timeframe: string
  summary: string
  highlights: readonly string[]
  tags: readonly string[]
  links: readonly ContentLink[]
}

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: readonly string[]
  aiDisclosure?: string
  readingMinutes: number
  category: 'software' | 'taste' | 'notes'
  topic?: 'internship-summary' | 'agent-architecture' | 'ai-tools'
  series?: 'codex-legendary-driver' | 'claude-agent-sdk' | 'nano-notebook-dev-log'
  featured?: boolean
  tags: readonly string[]
  status: 'draft' | 'planned' | 'published'
}

export type MusicItem = {
  id: string
  title: string
  artist: string
  mood: string
  note: string
}

export type MovieItem = {
  id: string
  title: string
  director: string
  year: number
  note: string
  posterUrl: string
}

export type PictureItem = {
  id: string
  title: string
  location: string
  palette: readonly string[]
  alt: string
  gradientFallback: string
}
