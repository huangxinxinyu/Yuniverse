import { useState, type CSSProperties } from 'react'
import { collections, type CollectionId } from '../content/siteContent'

const filterLabels: Record<string, string> = {
  all: 'All',
  album: 'Albums',
  track: 'Tracks',
  playlist: 'Playlists',
  film: 'Films',
  watchlist: 'Watchlist',
  favorite: 'Favorites',
  gallery: 'Gallery',
}

const collectionFilters = Object.fromEntries(
  collections.map((collection) => [
    collection.id,
    collection.id === 'music'
      ? ['all', 'album', 'playlist']
      : ['all', ...Array.from(new Set(collection.items.map((item) => item.kind)))],
  ]),
) as Record<CollectionId, string[]>

export function CollectionPage() {
  const [activeCollectionId, setActiveCollectionId] = useState(collections[0].id)
  const [activeFilters, setActiveFilters] = useState<Record<CollectionId, string>>({
    music: 'all',
    movies: 'all',
    pictures: 'all',
  })
  const [openPictureId, setOpenPictureId] = useState<string | null>(null)
  const openPicture = collections
    .flatMap((collection) => collection.items)
    .find((item) => item.id === openPictureId)

  return (
    <section
      aria-labelledby="collection-title"
      className="content-section page-section"
      data-page="collection"
      id="collection"
    >
      <p className="section-kicker">Collection</p>
      <h2 id="collection-title">Music, movies, and pictures</h2>
      <p>A small cabinet of references that shape the mood of the work.</p>

      <div
        aria-label="Collection media tabs"
        className="collection-tabs"
        role="tablist"
      >
        {collections.map((collection) => (
          <button
            aria-controls={`collection-panel-${collection.id}`}
            aria-selected={collection.id === activeCollectionId}
            className="tab-button"
            id={`collection-tab-${collection.id}`}
            key={collection.id}
            onClick={() => setActiveCollectionId(collection.id)}
            role="tab"
            type="button"
          >
            {collection.label}
          </button>
        ))}
      </div>

      {collections.map((collection) => {
        const activeFilter = activeFilters[collection.id]
        const visibleItems =
          activeFilter === 'all'
            ? collection.items
            : collection.items.filter((item) => item.kind === activeFilter)

        return (
          <div
            aria-labelledby={`collection-tab-${collection.id}`}
            className="collection-panel"
            hidden={collection.id !== activeCollectionId}
            id={`collection-panel-${collection.id}`}
            key={collection.id}
            role="tabpanel"
          >
            <p>{collection.intro}</p>
            <div className="filter-bar" aria-label="Collection view filters">
              {collectionFilters[collection.id].map((filter) => (
                <button
                  aria-pressed={activeFilter === filter}
                  className="filter-button"
                  key={filter}
                  onClick={() =>
                    setActiveFilters((current) => ({
                      ...current,
                      [collection.id]: filter,
                    }))
                  }
                  type="button"
                >
                  {filterLabels[filter] ?? filter}
                </button>
              ))}
            </div>
            <div
              className={`collection-list${
                collection.id === 'music'
                  ? ' music-artwork-grid'
                  : collection.id === 'movies'
                    ? ' movie-artwork-grid'
                    : ''
              }`}
            >
              {visibleItems.map((item) =>
              collection.id === 'pictures' ? (
                <button
                  aria-haspopup="dialog"
                  className="picture-card"
                  key={item.id}
                  onClick={() => setOpenPictureId(item.id)}
                  style={
                    {
                      '--picture-gradient': item.visual,
                    } as CSSProperties
                  }
                  type="button"
                >
                  <strong>Open picture</strong>
                  <span>{item.meta}</span>
                  <h3>{item.title}</h3>
                </button>
              ) : collection.id === 'music' ? (
                <article
                  aria-label={`${item.title} by ${item.creator}`}
                  className="album-art-card"
                  key={item.id}
                  title={`${item.title} / ${item.creator}`}
                >
                  <img alt="" className="album-art" src={item.visual} />
                </article>
              ) : collection.id === 'movies' ? (
                <article
                  aria-label={`${item.title} by ${item.creator}`}
                  className="movie-poster-card"
                  key={item.id}
                  title={`${item.title} / ${item.creator}`}
                >
                  <img alt="" className="movie-poster" src={item.visual} />
                </article>
              ) : (
                <article className="mini-card" key={item.id}>
                  <span>{filterLabels[item.kind] ?? item.kind}</span>
                  <h3>{item.title}</h3>
                  <p>{`${item.creator} / ${item.note}`}</p>
                </article>
              ),
              )}
              {visibleItems.length === 0 ? (
                <p className="empty-state">{collection.emptyState}</p>
              ) : null}
            </div>
          </div>
        )
      })}

      {openPicture ? (
        <div className="lightbox" role="dialog" aria-modal="true">
          <div className="lightbox-panel">
            <div
              className="picture-preview"
              style={
                {
                  '--picture-gradient': openPicture.visual,
                } as CSSProperties
              }
            ></div>
            <div>
              <p className="panel-label">{openPicture.meta}</p>
              <h3>{openPicture.title}</h3>
              <p>{openPicture.note}</p>
            </div>
            <button
              className="close-button"
              onClick={() => setOpenPictureId(null)}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
