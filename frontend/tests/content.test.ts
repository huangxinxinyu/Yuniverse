import { describe, expect, it } from 'vitest'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  aboutPageContent,
  blogPosts,
  blogSeries,
  blogTopics,
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
    expect(siteSections.blog.posts.map((post) => post.slug)).toEqual([
      'internship-agent-memory-governance',
      'dokploy-lightweight-paas-deployment-tradeoffs',
      'claude-agent-sdk-trace-to-eval',
      'codex-legendary-driver-context-noise',
      'codex-legendary-driver-skill-workflows',
      'internship-daytona-agent-workspace',
      'obsidian-codex-ai-knowledge-base',
      'agent-data-flywheel-observability-seo',
      'internship-invite-backend-flow',
      'internship-stripe-payment-backend-flow',
      'multica-local-agent-workflow',
      'internship-agent-infrastructure-notes',
      'hello-world',
    ])
  })

  it('keeps blog post bodies in dedicated post files', () => {
    const postsDirectory = join(process.cwd(), 'src/content/posts')
    const postFiles = readdirSync(postsDirectory)
      .filter((file) => file.endsWith('.ts') && file !== 'index.ts')
      .sort()

    expect(postFiles).toEqual(
      blogPosts
        .map((post) => `${post.slug}.ts`)
        .sort(),
    )
  })

  it('groups software writing into focused topics and scoped series', () => {
    expect(blogTopics.map((topic) => topic.id)).toEqual([
      'all',
      'internship-summary',
      'agent-architecture',
      'ai-tools',
    ])

    expect(blogSeries.map((series) => series.id)).toEqual([
      'all',
      'codex-legendary-driver',
      'claude-agent-sdk',
    ])

    expect(blogSeries.find((series) => series.id === 'codex-legendary-driver')?.topic)
      .toBe('ai-tools')
    expect(blogSeries.find((series) => series.id === 'claude-agent-sdk')?.topic)
      .toBe('agent-architecture')

    expect(
      blogPosts
        .filter((post) => post.topic === 'ai-tools')
        .map((post) => post.slug),
    ).toEqual([
      'codex-legendary-driver-context-noise',
      'codex-legendary-driver-skill-workflows',
      'obsidian-codex-ai-knowledge-base',
      'multica-local-agent-workflow',
    ])

    expect(
      blogPosts
        .filter((post) => post.series === 'codex-legendary-driver')
        .map((post) => post.slug),
    ).toEqual([
      'codex-legendary-driver-context-noise',
      'codex-legendary-driver-skill-workflows',
      'obsidian-codex-ai-knowledge-base',
      'multica-local-agent-workflow',
    ])

    expect(
      blogPosts
        .filter((post) => post.topic === 'internship-summary')
        .map((post) => post.slug),
    ).toEqual([
      'internship-agent-memory-governance',
      'internship-daytona-agent-workspace',
      'internship-invite-backend-flow',
      'internship-stripe-payment-backend-flow',
      'internship-agent-infrastructure-notes',
    ])

    expect(
      blogPosts
        .filter((post) => post.topic === 'agent-architecture')
        .map((post) => post.slug),
    ).toEqual([
      'claude-agent-sdk-trace-to-eval',
      'agent-data-flywheel-observability-seo',
    ])

    expect(
      blogPosts
        .filter((post) => post.series === 'claude-agent-sdk')
        .map((post) => post.slug),
    ).toEqual(['claude-agent-sdk-trace-to-eval'])
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
      expect.arrayContaining(['film']),
    )
    expect(categoryMap.movies).not.toEqual(
      expect.arrayContaining(['watchlist', 'favorite']),
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

  it('identifies 梦想家 as the Khalil Fong album', () => {
    const dreamer = collections
      .find((collection) => collection.id === 'music')
      ?.items.find((item) => item.title === '梦想家')

    expect(dreamer?.creator).toBe('方大同')
  })

  it('uses the concise music taste line for the music collection', () => {
    const musicCollection = collections.find((collection) => collection.id === 'music')

    expect(musicCollection?.intro).toBe('我是灵魂歌王。')
  })

  it('includes the expanded album picks requested for the music collection', () => {
    const musicItems = collections.find((collection) => collection.id === 'music')?.items ?? []
    const musicCreatorsByTitle = Object.fromEntries(
      musicItems.map((item) => [item.title, item.creator]),
    )

    expect(musicCreatorsByTitle).toMatchObject({
      'Head Hunters': 'Herbie Hancock',
      'Heal Me Good': 'Yufu',
      'Random Access Memories': 'Daft Punk',
      'My Beautiful Dark Twisted Fantasy': 'Kanye West',
      '亚特兰蒂斯': 'GALI',
      'Songs About Jane': 'Maroon 5',
      Soulboy: '方大同',
      '灰太阳': '施鑫文月',
      SOS: 'SZA',
    })
  })

  it('keeps every music entry in the album view with local cover art', () => {
    const musicItems = collections.find((collection) => collection.id === 'music')?.items

    expect(musicItems?.every((item) => item.kind === 'album')).toBe(true)
    expect(musicItems?.every((item) => item.visual?.startsWith('/images/albums/'))).toBe(true)
  })

  it('uses the requested movie picks instead of placeholder entries', () => {
    const movieItems = collections.find((collection) => collection.id === 'movies')?.items ?? []
    const movieCreatorsByTitle = Object.fromEntries(
      movieItems.map((item) => [item.title, item.creator]),
    )

    expect(movieCreatorsByTitle).toMatchObject({
      'The Notebook': 'Nick Cassavetes',
      'Project Hail Mary': 'Phil Lord and Christopher Miller',
      'Cold War': 'Longman Leung and Sunny Luk',
      Sicario: 'Denis Villeneuve',
      'Now You See Me': 'Louis Leterrier',
      Avatar: 'James Cameron',
      'One Battle After Another': 'Paul Thomas Anderson',
      'Kill Bill: Volume 1': 'Quentin Tarantino',
      'Pulp Fiction': 'Quentin Tarantino',
      'Inglourious Basterds': 'Quentin Tarantino',
      'Django Unchained': 'Quentin Tarantino',
      'Reservoir Dogs': 'Quentin Tarantino',
      'American Psycho': 'Mary Harron',
      Interstellar: 'Christopher Nolan',
      Inception: 'Christopher Nolan',
      'The Dark Knight': 'Christopher Nolan',
      Oppenheimer: 'Christopher Nolan',
      'Spider-Man: Across the Spider-Verse':
        'Joaquim Dos Santos, Kemp Powers, and Justin K. Thompson',
    })
    expect(movieItems.map((item) => item.title)).not.toEqual(
      expect.arrayContaining(['Film Notes', 'Watchlist', 'Favorites Coming']),
    )
  })

  it('keeps every movie entry in the film view with real poster art', () => {
    const movieItems = collections.find((collection) => collection.id === 'movies')?.items

    expect(movieItems?.every((item) => item.kind === 'film')).toBe(true)
    expect(
      movieItems?.every((item) => item.visual?.startsWith('https://')),
    ).toBe(true)
    expect(movieItems?.some((item) => item.visual?.endsWith('.svg'))).toBe(false)
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
