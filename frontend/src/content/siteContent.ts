import {
  blogPosts as baseBlogPosts,
  movieItems,
  musicItems,
  pictureItems,
  profile as baseProfile,
  workItems as baseWorkItems,
  type BlogPost as BaseBlogPost,
  type MovieItem,
  type MusicItem,
  type PictureItem,
  type Profile as BaseProfile,
  type WorkItem as BaseWorkItem,
} from '../data/content'
import { defaultLocale, locales, type Locale } from '../i18n/locale'
import { enCopy } from './copy/en'
import { zhCopy } from './copy/zh'

export type SectionId = 'about' | 'work' | 'blog' | 'collection'
export type CollectionId = 'music' | 'movies' | 'pictures'

export type NavigationItem = {
  href: `/${SectionId}`
  label: string
}

export type NavItem = NavigationItem

export type ProfileSignal = {
  label: string
  value: string
}

export type Profile = BaseProfile & {
  name: string
  tagline: string
  intro: string
  email: string
  location: string
  eyebrow: string
  heroText: string
  signals: readonly ProfileSignal[]
}

export type SectionSummary = {
  id: SectionId
  label: string
  eyebrow: string
  kicker: string
  title: string
  body: string
  summary: string
  meta: readonly string[]
}

export type AboutLink = {
  label: string
  href: string
  description: string
}

export type WorkProject = Omit<BaseWorkItem, 'kind' | 'status'> & {
  kind: string
  status: string
  category: string
  year: string
  stack: readonly string[]
  meta: string
  description: string
}

export type Project = WorkProject
export type WorkItem = WorkProject

export type BlogPost = BaseBlogPost & {
  categoryLabel: string
  topicLabel?: string
  seriesLabel?: string
  readingTime: string
  topics: readonly string[]
  href: `/blog/${string}`
  bodyLanguage: Locale
}

export type BlogTopicId = 'all' | NonNullable<BaseBlogPost['topic']>

export type BlogTopic = {
  id: BlogTopicId
  label: string
  description: string
}

export type BlogSeriesId = 'all' | NonNullable<BaseBlogPost['series']>

export type BlogSeries = {
  id: BlogSeriesId
  label: string
  description: string
  topic?: NonNullable<BaseBlogPost['topic']>
}

export type BlogCategoryId =
  | 'featured'
  | 'all'
  | 'software'
  | 'taste'
  | 'notes'
  | 'future'

export type BlogCategory = {
  id: BlogCategoryId
  label: string
  description: string
}

export type NoteItem = {
  title: string
  date: string
  summary: string
}

export type CollectionItem = {
  id: string
  title: string
  creator: string
  kind: string
  meta: string
  note: string
  year?: string
  visual?: string
}

export type Collection = {
  id: CollectionId
  label: string
  intro: string
  emptyState: string
  items: readonly [CollectionItem, ...CollectionItem[]]
}

export type AboutValue = {
  label: string
  text: string
}

export type AboutTool = {
  name: string
  role: string
}

export type AboutPersonalDetail = {
  id: string
  label: string
  meta: string
  detail: string
}

export type ContactId = 'wechat' | 'email' | 'phone' | 'github' | 'douyin' | 'rednote'

export type ContactItem = {
  id: ContactId
  label: string
  value: string
  href?: string
}

export type AboutPageContent = {
  eyebrow: string
  title: string
  subtitle: string
  statusNotice: string
  intro: {
    heading: string
    body: string
    coordinates: readonly AboutValue[]
  }
  values: {
    heading: string
    body: string
    items: readonly [AboutValue, ...AboutValue[]]
  }
  craft: {
    heading: string
    body: string
    tools: readonly [AboutTool, ...AboutTool[]]
  }
  personalDetails: {
    heading: string
    body: string
    items: readonly [AboutPersonalDetail, ...AboutPersonalDetail[]]
  }
}

export type SiteSections = {
  about: SectionSummary & {
    intro: string
    focusAreas: readonly string[]
    links: readonly AboutLink[]
  }
  work: SectionSummary & {
    projects: readonly [WorkProject, ...WorkProject[]]
  }
  blog: SectionSummary & {
    posts: readonly [BlogPost, ...BlogPost[]]
    featuredPost: BlogPost
    emptyState: string
  }
  collection: SectionSummary
}

export type WorkCopy = {
  kind: string
  status: string
  role: string
  summary: string
  highlights: readonly string[]
  linkLabels?: Readonly<Record<string, string>>
}

export type UiText = {
  nav: {
    home: string
    homeAria: (name: string) => string
    primaryAria: string
    languageAria: string
    languageNames: Record<Locale, string>
  }
  home: {
    viewWork: string
    about: string
    primaryLinksAria: string
    snapshotAria: string
    sectionsKicker: string
    portalTitle: string
  }
  about: {
    srTitle: string
    noticeAria: string
    noticeLabel: string
    kickers: { intro: string; values: string; craft: string; details: string }
    detailNotesAria: string
  }
  work: {
    highlightsAria: (title: string) => string
    topicsAria: (title: string) => string
    linksAria: (title: string) => string
  }
  blog: {
    featuredPost: string
    categoriesAria: string
    topicsAria: string
    seriesAria: string
    tagsAria: (title: string) => string
    featured: string
    readArticle: string
    paginationAria: string
    previous: string
    next: string
    pageStatus: (page: number, pageCount: number) => string
    pagesAria: string
    goToPage: (page: number) => string
    backToBlog: string
    originalLanguageNotice: Record<Locale, string>
  }
  summary: {
    aria: string
    panelLabel: string
    categoriesAria: string
    posts: string
    daysOnline: string
    days: (count: number) => string
    views: string
    visitors: string
    footnote: string
    petAlt: string
  }
  metrics: {
    aria: string
    views: (count: string) => string
    likes: (count: string) => string
    like: string
    unlike: string
  }
  collection: {
    tabsAria: string
    filtersAria: string
    filterLabels: Readonly<Record<string, string>>
    openPicture: string
    byline: (title: string, creator: string) => string
    close: string
  }
  contact: {
    aria: string
    kicker: string
    title: string
  }
}

type SectionCopy = Omit<SectionSummary, 'id' | 'label' | 'meta'> & {
  meta: readonly string[]
}

export type SiteCopy = {
  navigation: Record<SectionId, string>
  profile: Pick<
    Profile,
    'displayName' | 'tagline' | 'intro' | 'eyebrow' | 'heroText' | 'signals' | 'shortBio' | 'focusAreas'
  > & { location: string }
  contactLabels: Record<ContactId, string>
  readingTime: (minutes: number) => string
  tagLabels: Readonly<Record<string, string>>
  sections: {
    about: Omit<SectionCopy, 'meta'> & {
      intro: string
      links: readonly AboutLink[]
    }
    work: SectionCopy
    blog: SectionCopy & { emptyState: string }
    collection: SectionCopy
  }
  aboutPage: AboutPageContent
  blogCategories: readonly [BlogCategory, ...BlogCategory[]]
  blogTopics: readonly [BlogTopic, ...BlogTopic[]]
  blogSeries: readonly [BlogSeries, ...BlogSeries[]]
  collections: Record<CollectionId, Pick<Collection, 'label' | 'intro' | 'emptyState'>>
  work: Readonly<Record<string, WorkCopy>>
  pictures: Readonly<Record<string, Pick<PictureItem, 'title' | 'location' | 'alt'>>>
  ui: UiText
}

export type SiteContent = {
  locale: Locale
  navigationItems: readonly [NavigationItem, ...NavigationItem[]]
  profile: Profile
  focusAreas: readonly string[]
  contactItems: readonly ContactItem[]
  siteSections: SiteSections
  sectionSummaries: readonly [SectionSummary, ...SectionSummary[]]
  workItems: readonly [WorkProject, ...WorkProject[]]
  aboutPageContent: AboutPageContent
  blogCategories: readonly [BlogCategory, ...BlogCategory[]]
  blogTopics: readonly [BlogTopic, ...BlogTopic[]]
  blogSeries: readonly [BlogSeries, ...BlogSeries[]]
  blogPosts: readonly [BlogPost, ...BlogPost[]]
  notes: readonly [NoteItem, ...NoteItem[]]
  collections: readonly [Collection, ...Collection[]]
  ui: UiText
}

const mapNonEmpty = <Input, Output>(
  items: readonly [Input, ...Input[]],
  mapper: (item: Input, index: number) => Output,
): readonly [Output, ...Output[]] =>
  items.map(mapper) as unknown as readonly [Output, ...Output[]]

const contactChannels: readonly Omit<ContactItem, 'label'>[] = [
  { id: 'wechat', value: 'XinyuHimself' },
  {
    id: 'email',
    value: 'xinyuhimself@gmail.com',
    href: 'mailto:xinyuhimself@gmail.com',
  },
  { id: 'phone', value: '135 6727 7836', href: 'tel:+8613567277836' },
  {
    id: 'github',
    value: 'huangxinxinyu',
    href: 'https://github.com/huangxinxinyu',
  },
  { id: 'douyin', value: '@新新 man · 57967116619' },
  { id: 'rednote', value: '天目路耐面王 · 1475758150' },
]

const sectionIds = ['about', 'work', 'blog', 'collection'] as const satisfies readonly SectionId[]

const toMusicCollectionItem = (item: MusicItem): CollectionItem => ({
  id: item.id,
  title: item.title,
  creator: item.artist,
  kind: 'album',
  meta: item.mood,
  note: item.note,
  visual: `/images/albums/${item.id.replace(/^music-/, '')}.jpg`,
})

const toMovieCollectionItem = (item: MovieItem): CollectionItem => ({
  id: item.id,
  title: item.title,
  creator: item.director,
  kind: 'film',
  meta: `${item.director} / ${item.year}`,
  note: item.note,
  year: String(item.year),
  visual: item.posterUrl,
})

const toPictureCollectionItem = (item: PictureItem): CollectionItem => ({
  id: item.id,
  title: item.title,
  creator: item.location,
  kind: 'gallery',
  meta: item.location,
  note: item.alt,
  visual: item.gradientFallback,
})

const createSiteContent = (locale: Locale, copy: SiteCopy): SiteContent => {
  const navigationItems = mapNonEmpty(sectionIds, (id) => ({
    href: `/${id}` as const,
    label: copy.navigation[id],
  }))

  const profile: Profile = {
    ...baseProfile,
    ...copy.profile,
    name: 'Yuniverse',
    email: 'xinyuhimself@gmail.com',
    locationLabel: copy.profile.location,
  }

  const workProjects = mapNonEmpty(baseWorkItems, (item) => {
    const workCopy = copy.work[item.id]
    const localized = workCopy
      ? {
          ...item,
          ...workCopy,
          links: item.links.map((link) => ({
            ...link,
            label: workCopy.linkLabels?.[link.href] ?? link.label,
          })),
        }
      : item

    return {
      ...localized,
      category: localized.kind,
      year: localized.timeframe,
      stack: localized.tags,
      meta: `${localized.role} / ${localized.status}`,
      description: localized.summary,
    }
  })

  const labelFor = <Id extends string>(items: readonly { id: Id; label: string }[], id: Id) =>
    items.find((item) => item.id === id)?.label ?? id

  const posts = mapNonEmpty(baseBlogPosts, (post) => {
    const bodyLanguage = post.language ?? 'zh'
    const translation = locale === 'en' ? post.en : undefined
    const tags = post.tags.map((tag) => copy.tagLabels[tag] ?? tag)

    return {
      ...post,
      title: translation?.title ?? post.title,
      excerpt: translation?.excerpt ?? post.excerpt,
      aiDisclosure: translation?.aiDisclosure ?? post.aiDisclosure,
      tags,
      categoryLabel: labelFor(copy.blogCategories, post.category),
      topicLabel: post.topic ? labelFor(copy.blogTopics, post.topic) : undefined,
      seriesLabel: post.series ? labelFor(copy.blogSeries, post.series) : undefined,
      readingTime: copy.readingTime(post.readingMinutes),
      topics: tags,
      href: `/blog/${post.slug}` as const,
      bodyLanguage,
    }
  })

  const featuredPost = posts.find((post) => post.featured) ?? posts[0]

  const siteSections: SiteSections = {
    about: {
      ...copy.sections.about,
      id: 'about',
      label: copy.navigation.about,
      meta: copy.profile.focusAreas,
      focusAreas: copy.profile.focusAreas,
    },
    work: {
      ...copy.sections.work,
      id: 'work',
      label: copy.navigation.work,
      projects: workProjects,
    },
    blog: {
      ...copy.sections.blog,
      id: 'blog',
      label: copy.navigation.blog,
      posts,
      featuredPost,
    },
    collection: {
      ...copy.sections.collection,
      id: 'collection',
      label: copy.navigation.collection,
    },
  }

  const localizedPictures = mapNonEmpty(pictureItems, (item) => ({
    ...item,
    ...copy.pictures[item.id],
  }))

  return {
    locale,
    navigationItems,
    profile,
    focusAreas: copy.profile.focusAreas,
    contactItems: contactChannels.map((channel) => ({
      ...channel,
      label: copy.contactLabels[channel.id],
    })),
    siteSections,
    sectionSummaries: [
      siteSections.about,
      siteSections.work,
      siteSections.blog,
      siteSections.collection,
    ],
    workItems: workProjects,
    aboutPageContent: copy.aboutPage,
    blogCategories: copy.blogCategories,
    blogTopics: copy.blogTopics,
    blogSeries: copy.blogSeries,
    blogPosts: posts,
    notes: mapNonEmpty(posts, (post) => ({
      title: post.title,
      date: `${post.date} / ${post.readingTime}`,
      summary: post.excerpt,
    })),
    collections: [
      {
        id: 'music',
        ...copy.collections.music,
        items: mapNonEmpty(musicItems, toMusicCollectionItem),
      },
      {
        id: 'movies',
        ...copy.collections.movies,
        items: mapNonEmpty(movieItems, toMovieCollectionItem),
      },
      {
        id: 'pictures',
        ...copy.collections.pictures,
        items: mapNonEmpty(localizedPictures, toPictureCollectionItem),
      },
    ],
    ui: copy.ui,
  }
}

const copies: Record<Locale, SiteCopy> = { zh: zhCopy, en: enCopy }

const siteContentByLocale = Object.fromEntries(
  locales.map((locale) => [locale, createSiteContent(locale, copies[locale])]),
) as Record<Locale, SiteContent>

export const getSiteContent = (locale: Locale): SiteContent => siteContentByLocale[locale]

// Static exports keep the default-language content for callers outside React.
export const {
  navigationItems,
  profile,
  focusAreas,
  contactItems,
  siteSections,
  sectionSummaries,
  workItems,
  aboutPageContent,
  blogCategories,
  blogTopics,
  blogSeries,
  blogPosts,
  notes,
  collections,
} = siteContentByLocale[defaultLocale]
