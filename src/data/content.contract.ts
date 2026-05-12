import {
  blogPosts,
  lifeEvents,
  movieItems,
  musicItems,
  pictureItems,
  profile,
  workItems,
  type BlogPost,
  type LifeEvent,
  type MovieItem,
  type MusicItem,
  type PictureItem,
  type Profile,
  type WorkItem,
} from './content'

const assertNonEmpty = <T,>(items: readonly T[]) => {
  if (items.length === 0) {
    throw new Error('Expected non-empty content collection')
  }

  return items as readonly [T, ...T[]]
}

const typedProfile: Profile = profile
const typedWork: readonly [WorkItem, ...WorkItem[]] = assertNonEmpty(workItems)
const typedLife: readonly [LifeEvent, ...LifeEvent[]] = assertNonEmpty(lifeEvents)
const typedPosts: readonly [BlogPost, ...BlogPost[]] = assertNonEmpty(blogPosts)
const typedMusic: readonly [MusicItem, ...MusicItem[]] = assertNonEmpty(musicItems)
const typedMovies: readonly [MovieItem, ...MovieItem[]] = assertNonEmpty(movieItems)
const typedPictures: readonly [PictureItem, ...PictureItem[]] =
  assertNonEmpty(pictureItems)

void [
  typedProfile,
  typedWork,
  typedLife,
  typedPosts,
  typedMusic,
  typedMovies,
  typedPictures,
]
