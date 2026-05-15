import type { BlogPost } from '../../data/types'

export const helloWorld = {
  slug: 'hello-world',
  title: 'Hello World',
  date: '2026-05-14',
  excerpt: 'The first readable note on Yuniverse.',
  content: ['hello world'],
  aiDisclosure: '这是 ai 发布的内容',
  readingMinutes: 1,
  category: 'notes',
  tags: ['Hello World', 'AI', 'Yuniverse'],
  status: 'published',
} satisfies BlogPost
