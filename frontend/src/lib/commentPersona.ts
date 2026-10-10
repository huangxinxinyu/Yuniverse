import type { Locale } from '../i18n/locale'

// Commenters stay anonymous: the API hands each browser a stable persona number,
// and this table turns it into a default name and avatar, LoL-lobby style.
const adjectives: Record<Locale, string>[] = [
  { zh: '流浪的', en: 'Wandering' },
  { zh: '犯困的', en: 'Sleepy' },
  { zh: '好奇的', en: 'Curious' },
  { zh: '害羞的', en: 'Shy' },
  { zh: '路过的', en: 'Passing' },
  { zh: '开心的', en: 'Cheerful' },
  { zh: '认真的', en: 'Earnest' },
  { zh: '发呆的', en: 'Dreamy' },
  { zh: '饿了的', en: 'Hungry' },
  { zh: '勇敢的', en: 'Brave' },
  { zh: '安静的', en: 'Quiet' },
  { zh: '幸运的', en: 'Lucky' },
  { zh: '迷惑的', en: 'Puzzled' },
  { zh: '佛系的', en: 'Chill' },
  { zh: '蹦跶的', en: 'Bouncy' },
  { zh: '沉思的', en: 'Thoughtful' },
]

const animals: { emoji: string, name: Record<Locale, string> }[] = [
  { emoji: '🦊', name: { zh: '狐狸', en: 'Fox' } },
  { emoji: '🐼', name: { zh: '熊猫', en: 'Panda' } },
  { emoji: '🐧', name: { zh: '企鹅', en: 'Penguin' } },
  { emoji: '🦉', name: { zh: '猫头鹰', en: 'Owl' } },
  { emoji: '🐢', name: { zh: '乌龟', en: 'Turtle' } },
  { emoji: '🐙', name: { zh: '章鱼', en: 'Octopus' } },
  { emoji: '🦔', name: { zh: '刺猬', en: 'Hedgehog' } },
  { emoji: '🐨', name: { zh: '考拉', en: 'Koala' } },
  { emoji: '🦦', name: { zh: '水獭', en: 'Otter' } },
  { emoji: '🐳', name: { zh: '鲸鱼', en: 'Whale' } },
  { emoji: '🦥', name: { zh: '树懒', en: 'Sloth' } },
  { emoji: '🐸', name: { zh: '青蛙', en: 'Frog' } },
  { emoji: '🦝', name: { zh: '浣熊', en: 'Raccoon' } },
  { emoji: '🐰', name: { zh: '兔子', en: 'Rabbit' } },
  { emoji: '🦭', name: { zh: '海豹', en: 'Seal' } },
  { emoji: '🐌', name: { zh: '蜗牛', en: 'Snail' } },
]

const avatarColors = [
  '#e8d9c4',
  '#d9e4cf',
  '#cfe0e3',
  '#e6d3d9',
  '#ddd6ea',
  '#efe1bd',
  '#d3e2d6',
  '#e9d1c6',
]

export type CommentPersona = {
  color: string
  emoji: string
  name: string
}

export function commentPersona(seed: number, locale: Locale): CommentPersona {
  const value = Math.abs(Math.trunc(seed))
  const adjective = adjectives[value % adjectives.length]
  const animal = animals[Math.floor(value / adjectives.length) % animals.length]
  const color = avatarColors[
    Math.floor(value / (adjectives.length * animals.length)) % avatarColors.length
  ]
  const separator = locale === 'en' ? ' ' : ''

  return {
    color,
    emoji: animal.emoji,
    name: `${adjective[locale]}${separator}${animal.name[locale]}`,
  }
}
