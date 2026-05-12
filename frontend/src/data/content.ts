import type {
  BlogPost,
  LifeEvent,
  MovieItem,
  MusicItem,
  PictureItem,
  Profile,
  WorkItem,
} from './types'

export type {
  BlogPost,
  ContentLink,
  LifeEvent,
  MovieItem,
  MusicItem,
  PictureItem,
  Profile,
  ProfileLink,
  WorkItem,
} from './types'

export const profile = {
  displayName: '黄新宇',
  romanizedName: 'Xinyu',
  brandName: 'Yuniverse',
  shortBio:
    '学生和软件开发工程师，正在从上海实习走向 UCSD 的新阶段。',
  locationLabel: 'Shanghai / UCSD',
  focusAreas: ['Software engineering', 'AI tools', 'Creative systems', 'Fitness and film'],
  links: [
    { label: 'Work', href: '#work' },
    { label: 'GitHub', href: 'https://github.com/huangxinxinyu' },
    { label: 'Email', href: 'mailto:xinyuhimself@gmail.com' },
  ],
} satisfies Profile

export const workItems: readonly [WorkItem, ...WorkItem[]] = [
  {
    id: 'work-software-engineering',
    title: 'Software Engineering Practice',
    role: 'Student / Software developer',
    timeframe: 'In progress',
    summary:
      'A growing record of software engineering work, internships, and project practice.',
    tags: ['Software', 'Engineering', 'Learning'],
    links: [{ label: 'GitHub', href: 'https://github.com/huangxinxinyu' }],
    featuredMetric: 'Software development',
  },
  {
    id: 'work-yuniverse-site',
    title: 'Yuniverse Website',
    role: 'Designer / Developer',
    timeframe: '2026',
    summary:
      'A personal website that gives work, school, interests, and contact information a clearer home.',
    tags: ['React', 'TypeScript', 'Personal site'],
    links: [{ label: 'Current site', href: '#work-yuniverse-site' }],
    featuredMetric: 'Personal identity',
  },
  {
    id: 'work-more-coming',
    title: 'More Projects Coming',
    role: 'Software developer',
    timeframe: 'To be updated',
    summary:
      'Detailed project notes will be added after the public scope, links, and screenshots are confirmed.',
    tags: ['Portfolio', 'Projects', 'In progress'],
    links: [{ label: 'Contact', href: 'mailto:xinyuhimself@gmail.com' }],
    featuredMetric: 'Details pending',
  },
]

export const lifeEvents: readonly [LifeEvent, ...LifeEvent[]] = [
  {
    id: 'life-huzhou',
    year: 'Primary school',
    title: '浙江省湖州市递铺第三小学',
    place: 'Huzhou, Zhejiang',
    summary: 'The earliest public education coordinate for this timeline.',
    type: 'study',
  },
  {
    id: 'life-hangzhou',
    year: 'Middle and high school',
    title: '杭州英特外国语学校',
    place: 'Hangzhou',
    summary: 'A long middle-school and high-school stage before studying abroad.',
    type: 'study',
  },
  {
    id: 'life-sydney',
    year: 'Bachelor',
    title: 'University of Sydney',
    place: 'Sydney',
    summary:
      'Bachelor stage: studied Software Engineering at the University of Sydney.',
    type: 'study',
  },
  {
    id: 'life-ucsd',
    year: 'Postgraduate',
    title: 'UCSD ECE',
    place: 'San Diego',
    summary:
      'Postgraduate stage: preparing to continue ECE study at UCSD.',
    type: 'milestone',
  },
]

export const blogPosts: readonly [BlogPost, ...BlogPost[]] = [
  {
    slug: 'yuniverse-and-the-universe',
    title: 'Yuniverse and the Universe',
    date: '2026-05-11',
    excerpt:
      'A future note about why this site is called Yuniverse, and how a personal universe can hold work, warmth, and curiosity.',
    readingMinutes: 3,
    category: 'systems',
    featured: true,
    tags: ['Yuniverse', 'Identity', 'Personal site'],
    status: 'planned',
  },
  {
    slug: 'bachelor-and-postgraduate-study',
    title: 'Bachelor and Postgraduate Study',
    date: '2026-05-11',
    excerpt:
      'A short education note separating the Sydney software engineering bachelor stage from the UCSD ECE postgraduate stage.',
    readingMinutes: 4,
    category: 'life',
    tags: ['Bachelor', 'Postgraduate', 'Study'],
    status: 'planned',
  },
  {
    slug: 'software-engineering-notes',
    title: 'Software Engineering Notes',
    date: '2026-05-11',
    excerpt:
      'A place for future notes from internships, school projects, and software development practice.',
    readingMinutes: 4,
    category: 'software',
    tags: ['Software', 'Engineering', 'Projects'],
    status: 'planned',
  },
  {
    slug: 'fitness-films-and-fun',
    title: 'Fitness, Films, and Fun',
    date: '2026-05-11',
    excerpt:
      'A lighter note for the parts of life around code: gym, movies, basketball, and playful taste.',
    readingMinutes: 4,
    category: 'life',
    tags: ['Fitness', 'Movies', 'Basketball'],
    status: 'planned',
  },
  {
    slug: 'work-in-progress',
    title: 'Work in Progress',
    date: '2026-05-11',
    excerpt:
      'A holding note for project writeups that will be added after the public details are ready.',
    readingMinutes: 2,
    category: 'notes',
    tags: ['Portfolio', 'Projects', 'Writing'],
    status: 'planned',
  },
]

export const musicItems: readonly [MusicItem, ...MusicItem[]] = [
  {
    id: 'music-dance',
    title: 'Dance',
    artist: 'Personal interest',
    mood: 'Energetic',
    note: 'A first note for the music and movement side of the site.',
  },
  {
    id: 'music-rap',
    title: 'Rap',
    artist: 'Personal interest',
    mood: 'Playful',
    note: 'A future place for real tracks, artists, or playlists.',
  },
  {
    id: 'music-more-coming',
    title: 'Music List Coming',
    artist: 'To be updated',
    mood: 'Open',
    note: 'Specific music entries will be added when the list is ready.',
  },
]

export const movieItems: readonly [MovieItem, ...MovieItem[]] = [
  {
    id: 'movie-film-interest',
    title: 'Film Notes',
    director: 'To be updated',
    year: 2026,
    note: 'A place for movies that belong in the public version of the site.',
  },
  {
    id: 'movie-watchlist',
    title: 'Watchlist',
    director: 'To be updated',
    year: 2026,
    note: 'A future list for films and shows worth keeping.',
  },
  {
    id: 'movie-favorites-coming',
    title: 'Favorites Coming',
    director: 'To be updated',
    year: 2026,
    note: 'Specific favorite movies will be added later.',
  },
]

export const pictureItems: readonly [PictureItem, ...PictureItem[]] = [
  {
    id: 'picture-shanghai',
    title: 'Shanghai Internship',
    location: 'Shanghai',
    palette: ['#f6d365', '#fda085', '#30323d'],
    alt: 'A future visual note for the Shanghai internship stage.',
    gradientFallback: 'linear-gradient(135deg, #f6d365 0%, #fda085 55%, #30323d 100%)',
  },
  {
    id: 'picture-sydney',
    title: 'Sydney',
    location: 'Sydney',
    palette: ['#5ee7df', '#b490ca', '#17202a'],
    alt: 'A future visual note for the Sydney study stage.',
    gradientFallback: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 52%, #17202a 100%)',
  },
  {
    id: 'picture-ucsd',
    title: 'UCSD',
    location: 'San Diego',
    palette: ['#d4fc79', '#96e6a1', '#2f3e46'],
    alt: 'A future visual note for the UCSD chapter.',
    gradientFallback: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 58%, #2f3e46 100%)',
  },
]
