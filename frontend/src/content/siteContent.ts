import {
  blogPosts as baseBlogPosts,
  lifeEvents,
  movieItems,
  musicItems,
  pictureItems,
  profile as baseProfile,
  workItems as baseWorkItems,
  type BlogPost as BaseBlogPost,
  type LifeEvent as BaseLifeEvent,
  type MovieItem,
  type MusicItem,
  type PictureItem,
  type WorkItem as BaseWorkItem,
} from '../data/content'

export type SectionId = 'about' | 'work' | 'life' | 'blog' | 'collection'
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
  status: 'Prototype' | 'Study' | 'Draft'
  stack: readonly string[]
  meta: string
  description: string
}

export type Project = WorkProject
export type WorkItem = WorkProject

export type LifeEvent = BaseLifeEvent & {
  date: string
  note: string
  tags: readonly string[]
}

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
  | 'life'
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
  links?: readonly {
    label: string
    href: string
    description: string
    icon: 'mail' | 'github'
  }[]
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
  life: SectionSummary & {
    events: readonly [LifeEvent, ...LifeEvent[]]
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
  { href: '/life', label: 'Life' },
  { href: '/blog', label: 'Blog' },
  { href: '/collection', label: 'Collection' },
]

export const profile: Profile = {
  ...baseProfile,
  name: 'Yuniverse',
  displayName: '黄新宇',
  tagline: 'A personal universe for software work, study, warmth, and curiosity.',
  intro:
    '黄新宇，本科就读于悉尼大学软件工程专业，研究生阶段将前往 UCSD ECE。现在关注软件开发、AI 工具。',
  email: 'xinyuhimself@gmail.com',
  location: baseProfile.locationLabel,
  eyebrow: 'Yuniverse / 黄新宇',
  heroText:
    'Yuniverse 是黄新宇的个人宇宙也是我的创意工坊：这里简单介绍下自己, 会放一些生活、工作的碎片，也会写点博客',
  signals: [
    { label: 'Mode', value: 'Student / Developer' },
    { label: 'Focus', value: 'Software / AI tools / Personal site' },
    { label: 'Status', value: 'Interning in Shanghai, heading to UCSD' },
  ],
}

export const focusAreas = baseProfile.focusAreas

const workProjects = mapNonEmpty(baseWorkItems, (item, index) => ({
  ...item,
  category: ['Software development', 'Personal website', 'Portfolio planning'][index],
  year: item.timeframe,
  status: (['Prototype', 'Study', 'Draft'] as const)[index],
  stack: item.tags,
  meta: `${item.role} / ${item.timeframe}`,
  description: item.summary,
}))

const timelineEvents = mapNonEmpty(lifeEvents, (event) => ({
  ...event,
  date: event.year,
  note: event.summary,
  tags: [event.type, event.place],
}))

const blogCategoryLabels: Record<BaseBlogPost['category'], string> = {
  software: 'Software',
  life: 'Life',
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
    title: 'About 黄新宇',
    intro:
      '学生、软件开发工程师，也是 Yuniverse 这个个人宇宙的整理者。',
    body:
      '本科阶段在悉尼大学学习软件工程。研究生阶段将前往 UCSD ECE；目前在上海实习，继续积累软件开发和真实项目经验。',
    summary:
      '关于黄新宇的学习轨迹、软件开发方向和个人兴趣。',
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
      {
        label: 'Life',
        href: '/life',
        description: '湖州、杭州、USYD本科和 UCSD 研究生阶段的公开时间线。',
      },
    ],
  },
  work: {
    id: 'work',
    label: 'Work',
    eyebrow: 'Work',
    kicker: 'Selected work',
    title: 'Software work, projects, and things still being organized.',
    body:
      '具体项目还在整理公开范围。现在先保留软件开发、个人网站和未来项目说明，避免把未确认的信息写成作品案例。',
    summary:
      '软件开发相关经历和项目整理区。',
    meta: ['Software development', 'Student work', 'Portfolio in progress'],
    projects: workProjects,
  },
  life: {
    id: 'life',
    label: 'Life',
    eyebrow: 'Life',
    kicker: 'Life experience',
    title: 'A public timeline across school, bachelor, and postgraduate chapters.',
    body:
      '这条时间线只放我主要学习和生活过的城市坐标，后续可以继续补充更多生活节点。',
    summary: '湖州、杭州、悉尼本科阶段和圣地亚哥研究生阶段组成的公开成长线。',
    meta: ['Huzhou', 'Hangzhou', 'Sydney', 'San Diego, CA'],
    events: timelineEvents,
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
    meta: ['Software', 'Study', 'Life', 'Yuniverse', 'Notes'],
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
  siteSections.life,
  siteSections.blog,
  siteSections.collection,
] as const satisfies readonly [SectionSummary, ...SectionSummary[]]

export const workItems = workProjects

export const aboutPageContent: AboutPageContent = {
  eyebrow: 'Yuniverse / personal identity',
  title: '黄新宇',
  subtitle:
    '学生、软件开发工程师，正准备去UCSD读书。',
  statusNotice:
    'This page uses the current public draft. More project details and writing will be added as they are ready.',
  intro: {
    heading: 'Intro',
    body:
      '我本科阶段在悉尼大学学习软件工程，研究生阶段会去 UCSD ECE。现在的公开身份很简单：学生、软件开发工程师，trying to build a good personal ip, might as well create something cool。',
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
      'Yuniverse 是一个个人宇宙，生活、学习、工作我都会放进去。',
    items: [
      {
        label: 'Inspiration',
        text: '这是个创意工坊，后面会有各种各样的想法在这里实践。',
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
      '目前先用简单的方式介绍软件开发方向，具体项目、技术细节和截图会在 Work 页面逐步补全。',
    tools: [
      { name: 'Software Engineering', role: '本科主线和项目基础' },
      { name: 'UCSD ECE', role: '下一阶段学习方向' },
      { name: 'AI tools', role: '感兴趣的开发和使用方向' },
      { name: 'Personal website', role: '持续整理身份、作品和兴趣' },
    ],
  },
  personalDetails: {
    heading: 'Personal details and contact',
    body:
      '这些信息先以公开安全的方式放在页面上，之后可以继续调整展示层级。',
    items: [
      {
        id: 'software',
        label: 'Software',
        meta: 'Work',
        detail: '学生 / 软件开发工程师，项目细节会继续整理到 Work 页面。',
      },
      {
        id: 'contact',
        label: 'Contact',
        meta: 'Open',
        detail: 'WeChat: XinyuHimself / Phone: 13567277836.',
        links: [
          {
            label: 'Email',
            href: 'mailto:xinyuhimself@gmail.com',
            description: 'xinyuhimself@gmail.com',
            icon: 'mail',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/huangxinxinyu',
            description: 'github.com/huangxinxinyu',
            icon: 'github',
          },
        ],
      },
      {
        id: 'bachelor',
        label: 'Bachelor',
        meta: 'Sydney',
        detail: '本科阶段在悉尼大学学习软件工程。',
      },
      {
        id: 'postgraduate',
        label: 'Postgraduate',
        meta: 'UCSD ECE',
        detail: '研究生阶段将前往 UCSD ECE。',
      },
      {
        id: 'interests',
        label: 'Interests',
        meta: 'Life',
        detail: '唱跳 rap 篮球。',
      },
      {
        id: 'location',
        label: 'Location',
        meta: 'Now',
        detail: '目前在上海实习，之后会去 UCSD 继续读书。',
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
    id: 'life',
    label: 'Life',
    description: 'Field notes from routines, walks, and transitions.',
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
