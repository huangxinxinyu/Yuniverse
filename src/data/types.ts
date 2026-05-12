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
  role: string
  timeframe: string
  summary: string
  tags: readonly string[]
  links: readonly ContentLink[]
  featuredMetric: string
}

export type LifeEvent = {
  id: string
  year: string
  title: string
  place: string
  summary: string
  type: string
}

export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  readingMinutes: number
  category: 'software' | 'systems' | 'life' | 'taste' | 'notes'
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
}

export type PictureItem = {
  id: string
  title: string
  location: string
  palette: readonly string[]
  alt: string
  gradientFallback: string
}
