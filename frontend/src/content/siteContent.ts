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
  type WorkItem as BaseWorkItem,
} from '../data/content'

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

export type Profile = typeof baseProfile & {
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

export type WorkProject = BaseWorkItem & {
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

export type ContactItem = {
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

const mapNonEmpty = <Input, Output>(
  items: readonly [Input, ...Input[]],
  mapper: (item: Input, index: number) => Output,
): readonly [Output, ...Output[]] =>
  items.map(mapper) as unknown as readonly [Output, ...Output[]]

export const navigationItems: readonly [NavigationItem, ...NavigationItem[]] = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/collection', label: 'Collection' },
]

export const profile: Profile = {
  ...baseProfile,
  name: 'Yuniverse',
  displayName: '黄新宇',
  tagline: 'A personal universe for software work, study, warmth, and curiosity.',
  intro:
    '黄新宇，本科毕业于悉尼大学软件工程专业，目前在 UCSD ECE 攻读研究生。现在关注软件开发、AI 工具。',
  email: 'xinyuhimself@gmail.com',
  location: baseProfile.locationLabel,
  eyebrow: 'Yuniverse / 黄新宇',
  heroText:
    'Yuniverse 是黄新宇的个人宇宙也是我的创意工坊：这里简单介绍下自己, 会放一些生活、工作的碎片，也会写点博客',
  signals: [
    { label: 'Mode', value: 'Student / Developer' },
    { label: 'Focus', value: 'Software / AI tools / Personal site' },
    { label: 'Status', value: 'Studying at UCSD ECE' },
  ],
}

export const focusAreas = baseProfile.focusAreas

const workProjects = mapNonEmpty(baseWorkItems, (item) => ({
  ...item,
  category: item.kind,
  year: item.timeframe,
  stack: item.tags,
  meta: `${item.role} / ${item.status}`,
  description: item.summary,
}))

export const contactItems: readonly ContactItem[] = [
  { label: 'WeChat', value: 'XinyuHimself' },
  {
    label: 'Email',
    value: 'xinyuhimself@gmail.com',
    href: 'mailto:xinyuhimself@gmail.com',
  },
  { label: 'Phone', value: '135 6727 7836', href: 'tel:+8613567277836' },
  {
    label: 'GitHub',
    value: 'huangxinxinyu',
    href: 'https://github.com/huangxinxinyu',
  },
  { label: 'Douyin', value: '@新新 man · 57967116619' },
  { label: 'RedNote', value: '天目路耐面王 · 1475758150' },
]

const blogCategoryLabels: Record<BaseBlogPost['category'], string> = {
  software: 'Software',
  taste: 'Taste',
  notes: 'Notes',
}

const blogTopicLabels: Record<NonNullable<BaseBlogPost['topic']>, string> = {
  'internship-summary': '实习总结',
  'agent-architecture': 'Agent 架构分享',
  'ai-tools': 'AI 工具分享',
}

const blogSeriesLabels: Record<NonNullable<BaseBlogPost['series']>, string> = {
  'codex-legendary-driver': 'Codex 传奇驾驶员',
  'claude-agent-sdk': 'Claude Agent SDK',
  'nano-notebook-dev-log': 'nano-notebook 开发日志',
}

const posts = mapNonEmpty(baseBlogPosts, (post) => ({
  ...post,
  categoryLabel: blogCategoryLabels[post.category],
  topicLabel: post.topic ? blogTopicLabels[post.topic] : undefined,
  seriesLabel: post.series ? blogSeriesLabels[post.series] : undefined,
  readingTime: `${post.readingMinutes} min read`,
  topics: post.tags,
  href: `/blog/${post.slug}` as const,
}))

const featuredPost = posts.find((post) => post.featured) ?? posts[0]

export const notes = mapNonEmpty(posts, (post) => ({
  title: post.title,
  date: `${post.date} / ${post.readingTime}`,
  summary: post.excerpt,
}))

export const siteSections: SiteSections = {
  about: {
    id: 'about',
    label: 'About',
    eyebrow: 'About',
    kicker: 'Personal identity',
    title: '关于黄新宇',
    intro:
      '学生、软件开发工程师，也是 Yuniverse 这个个人宇宙的整理者。',
    body:
      '本科毕业于悉尼大学软件工程专业，现在在 UCSD ECE 读研。我做软件开发，也把项目、生活和兴趣慢慢放进 Yuniverse。',
    summary:
      '学习、软件开发和兴趣的简单介绍。',
    meta: baseProfile.focusAreas,
    focusAreas,
    links: [
      {
        label: 'Work',
        href: '/work',
        description: '软件开发相关经历和项目会逐步整理到这里。',
      },
      {
        label: 'Writing',
        href: '/blog',
        description: '关于 Yuniverse、学习和软件工程的未来文章主题。',
      },
      {
        label: 'Collection',
        href: '/collection',
        description: '电影、健身、音乐和其他兴趣会在这里慢慢补充。',
      },
    ],
  },
  work: {
    id: 'work',
    label: 'Work',
    eyebrow: 'Work',
    kicker: 'Selected work',
    title: 'Selected work',
    body:
      'A few things I build, research, and keep evolving.',
    summary:
      '软件开发和项目的公开记录。',
    meta: ['Software development', 'Student work', 'Personal projects'],
    projects: workProjects,
  },
  blog: {
    id: 'blog',
    label: 'Blog',
    eyebrow: 'Blog',
    kicker: 'Blog',
    title: 'Notes planned for Yuniverse.',
    body:
      '啥都写点，不好维护了我再新建个网站😜',
    summary: 'Yuniverse 未来文章和笔记的规划区。',
    meta: ['Software', 'Study', 'Yuniverse', 'Notes'],
    posts,
    featuredPost,
    emptyState:
      '这个分类的文章还在整理，之后会补上真实标题、正文和链接。',
  },
  collection: {
    id: 'collection',
    label: 'Collection',
    eyebrow: 'Collection',
    kicker: 'Collection',
    title: 'Music, movies, and pictures',
    body: '一个暂时很轻的兴趣柜子，用来放电影、健身、音乐和未来的图片主题。',
    summary: '黄新宇的兴趣和收藏整理区。',
    meta: ['Music', 'Movies', 'Pictures', 'Fitness'],
  },
}

export const sectionSummaries = [
  siteSections.about,
  siteSections.work,
  siteSections.blog,
  siteSections.collection,
] as const satisfies readonly [SectionSummary, ...SectionSummary[]]

export const workItems = workProjects

export const aboutPageContent: AboutPageContent = {
  eyebrow: 'Yuniverse / personal identity',
  title: '关于我',
  subtitle:
    'UCSD ECE 在读，做软件开发。',
  statusNotice:
    'Yuniverse grows with me—one project, note, and moment at a time.',
  intro: {
    heading: 'Intro',
    body:
      '本科毕业于悉尼大学软件工程专业，现在在 UCSD ECE 读研。我做软件开发，也把项目、生活和兴趣慢慢放进 Yuniverse。',
    coordinates: [
      { label: 'Primary school', text: '浙江省湖州市递铺第三小学（i dont think people gon care tho）' },
      { label: 'Middle / high school', text: '杭州英特外国语学校' },
      { label: 'Bachelor', text: '悉尼大学 Software Engineering' },
      { label: 'Postgraduate', text: 'UCSD ECE' },
    ],
  },
  values: {
    heading: 'What this site should feel like',
    body:
      'Yuniverse 是我放生活、学习和工作的地方。',
    items: [
      {
        label: 'Inspiration',
        text: '我会在这里试一些新想法。',
      },
      {
        label: 'Warm',
        text: 'It‘s a cold world out there, babe 🫶💋',
      },
      {
        label: 'Fun',
        text: '希望这个网站看起来好玩。',
      },
    ],
  },
  craft: {
    heading: 'Software development',
    body:
      '这里先介绍软件开发方向。项目细节、技术说明和截图会慢慢放进 Work 页面。',
    tools: [
      { name: 'Software Engineering', role: '本科主线和项目基础' },
      { name: 'UCSD ECE', role: '当前研究生学习方向' },
      { name: 'AI tools', role: '感兴趣的开发和使用方向' },
      { name: 'Personal website', role: '持续整理身份、作品和兴趣' },
    ],
  },
  personalDetails: {
    heading: 'Personal details',
    body:
      '一些关于学习、工作和兴趣的补充。',
    items: [
      {
        id: 'software',
        label: 'Software',
        meta: 'Work',
        detail: '学生、软件开发工程师。项目细节会慢慢放到 Work 页面。',
      },
      {
        id: 'bachelor',
        label: 'Bachelor',
        meta: 'Sydney',
        detail: '本科毕业于悉尼大学软件工程专业。',
      },
      {
        id: 'postgraduate',
        label: 'Postgraduate',
        meta: 'UCSD ECE',
        detail: '目前在 UCSD ECE 攻读研究生。',
      },
      {
        id: 'interests',
        label: 'Interests',
        meta: 'Personal',
        detail: '唱跳 rap 篮球。',
      },
      {
        id: 'location',
        label: 'Location',
        meta: 'San Diego',
        detail: '目前在 UCSD 读书。',
      },
    ],
  },
}

export const blogCategories: readonly [BlogCategory, ...BlogCategory[]] = [
  {
    id: 'featured',
    label: 'Featured',
    description: 'The current highlighted planned note.',
  },
  {
    id: 'all',
    label: 'All',
    description: 'Every planned post in the current blog index.',
  },
  {
    id: 'software',
    label: 'Software',
    description: 'Software writing, including internship notes, agent architecture, and AI tools.',
  },
  {
    id: 'taste',
    label: 'Taste',
    description: 'Interface atmosphere, references, and aesthetic judgment.',
  },
  {
    id: 'notes',
    label: 'Notes',
    description: 'Knowledge fragments and draft thinking.',
  },
  {
    id: 'future',
    label: 'Future',
    description: 'A category for writing ideas that are still being shaped.',
  },
]

export const blogTopics: readonly [BlogTopic, ...BlogTopic[]] = [
  {
    id: 'all',
    label: 'All software',
    description: 'All software writing in the current blog index.',
  },
  {
    id: 'internship-summary',
    label: '实习总结',
    description: 'Internship writeups, backend flow notes, and project learning.',
  },
  {
    id: 'agent-architecture',
    label: 'Agent 架构分享',
    description: 'Agent architecture, observability, infrastructure, and system design notes.',
  },
  {
    id: 'ai-tools',
    label: 'AI 工具分享',
    description: 'AI tools, Codex usage, local workflows, and reusable working patterns.',
  },
]

export const blogSeries: readonly [BlogSeries, ...BlogSeries[]] = [
  {
    id: 'all',
    label: 'All series',
    description: 'All posts in this topic.',
  },
  {
    id: 'codex-legendary-driver',
    label: 'Codex 传奇驾驶员',
    description: 'Codex usage notes, driving patterns, and context discipline.',
    topic: 'ai-tools',
  },
  {
    id: 'claude-agent-sdk',
    label: 'Claude Agent SDK',
    description: 'Claude Agent SDK architecture, observability, and eval notes.',
    topic: 'agent-architecture',
  },
  {
    id: 'nano-notebook-dev-log',
    label: 'nano-notebook 开发日志',
    description: 'nano-notebook 的产品故事、Agent 基础设施选型与真实实现记录。',
    topic: 'agent-architecture',
  },
]

export const blogPosts = posts

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

export const collections: readonly [Collection, ...Collection[]] = [
  {
    id: 'music',
    label: 'Music',
    intro: '我是灵魂歌王。',
    emptyState: 'No music has been pinned for this filter yet.',
    items: mapNonEmpty(musicItems, toMusicCollectionItem),
  },
  {
    id: 'movies',
    label: 'Movies',
    intro: '我看的爆米花电影偏多，啥都放，i aint no pro',
    emptyState: 'No movies match this view yet.',
    items: mapNonEmpty(movieItems, toMovieCollectionItem),
  },
  {
    id: 'pictures',
    label: 'Pictures',
    intro: 'Visual notes for Shanghai, Sydney, UCSD, and future photo themes.',
    emptyState: 'No pictures have been saved here yet.',
    items: mapNonEmpty(pictureItems, toPictureCollectionItem),
  },
]
