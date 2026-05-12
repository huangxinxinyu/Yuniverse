import { describe, expect, it } from 'vitest'
import {
  aboutPageContent,
  blogPosts,
  collections,
  navigationItems,
  siteSections,
} from '../src/content/siteContent'

describe('site content model', () => {
  it('defines navigation and content for every required section', () => {
    expect(navigationItems.map((item) => item.href)).toEqual([
      '/about',
      '/work',
      '/life',
      '/blog',
      '/collection',
    ])

    expect(siteSections.about.links.length).toBeGreaterThanOrEqual(3)
    expect(siteSections.work.projects.length).toBeGreaterThanOrEqual(3)
    expect(siteSections.life.events.length).toBeGreaterThanOrEqual(3)
    expect(siteSections.blog.posts.length).toBeGreaterThanOrEqual(3)
  })

  it('groups collection entries into the expected tabs', () => {
    expect(collections.map((collection) => collection.id)).toEqual([
      'music',
      'movies',
      'pictures',
    ])

    for (const collection of collections) {
      expect(collection.items.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('labels collection items with useful browsing categories', () => {
    const categoryMap = Object.fromEntries(
      collections.map((collection) => [
        collection.id,
        collection.items.map((item) =>
          'kind' in item && typeof item.kind === 'string' ? item.kind : '',
        ),
      ]),
    )

    expect(categoryMap.music).toEqual(
      expect.arrayContaining(['album']),
    )
    expect(categoryMap.music).not.toEqual(
      expect.arrayContaining(['track', 'playlist']),
    )
    expect(categoryMap.movies).toEqual(
      expect.arrayContaining(['film', 'watchlist', 'favorite']),
    )
    expect(categoryMap.pictures).toEqual(
      expect.arrayContaining(['gallery']),
    )
  })

  it('uses the curated music list instead of placeholder entries', () => {
    const musicTitles = collections
      .find((collection) => collection.id === 'music')
      ?.items.map((item) => item.title)

    expect(musicTitles).toEqual(
      expect.arrayContaining([
        "What's Going On",
        '2014 Forest Hills Drive',
        'THIS MUSIC MAY CONTAIN HOPE.',
        'The Miseducation of Lauryn Hill',
        'David Tao',
      ]),
    )
    expect(musicTitles).not.toEqual(
      expect.arrayContaining(['Dance', 'Rap', 'Music List Coming']),
    )
  })

  it('keeps every music entry in the album view with local cover art', () => {
    const musicItems = collections.find((collection) => collection.id === 'music')?.items

    expect(musicItems?.every((item) => item.kind === 'album')).toBe(true)
    expect(musicItems?.every((item) => item.visual?.startsWith('/images/albums/'))).toBe(true)
  })

  it('keeps collection empty states ready for future filtered views', () => {
    for (const collection of collections) {
      expect(collection.emptyState).toMatch(/\w/)
    }
  })

  it('separates bachelor and postgraduate education content', () => {
    const lifeTitles = siteSections.life.events.map((event) => event.title)
    const aboutCoordinates = aboutPageContent.intro.coordinates.map(
      (coordinate) => coordinate.label,
    )
    const studyDetails = aboutPageContent.personalDetails.items.filter(
      (detail) => ['bachelor', 'postgraduate'].includes(detail.id),
    )

    expect(lifeTitles).toEqual(
      expect.arrayContaining(['University of Sydney', 'UCSD ECE']),
    )
    expect(aboutCoordinates).toEqual(
      expect.arrayContaining(['Bachelor', 'Postgraduate']),
    )
    expect(studyDetails).toHaveLength(2)
    expect(blogPosts.map((post) => post.title)).not.toContain('From Sydney to UCSD')
  })
})
