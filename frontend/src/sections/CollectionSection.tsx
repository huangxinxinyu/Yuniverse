import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { collections, siteSections } from '../data/siteContent'
import type { CollectionId } from '../data/siteContent'

export function CollectionSection() {
  const section = siteSections.collection
  const [activeId, setActiveId] = useState<CollectionId>(collections[0].id)
  const activeCollection =
    collections.find((collection) => collection.id === activeId) ?? collections[0]

  return (
    <section className="content-section" id={section.id}>
      <SectionHeading {...section} />
      <div className="collection-tabs" role="tablist" aria-label="Collection categories">
        {collections.map((collection) => (
          <button
            aria-controls={`collection-${collection.id}`}
            aria-selected={collection.id === activeCollection.id}
            className="collection-tab"
            id={`tab-${collection.id}`}
            key={collection.id}
            onClick={() => setActiveId(collection.id)}
            role="tab"
            type="button"
          >
            {collection.label}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`tab-${activeCollection.id}`}
        className={`collection-panel${
          activeCollection.id === 'music'
            ? ' collection-list music-artwork-grid'
            : activeCollection.id === 'movies'
              ? ' collection-list movie-artwork-grid'
              : ''
        }`}
        id={`collection-${activeCollection.id}`}
        role="tabpanel"
      >
        {activeCollection.items.map((item) =>
          activeCollection.id === 'music' ? (
            <article
              aria-label={`${item.title} by ${item.creator}`}
              className="album-art-card"
              key={item.id}
              title={`${item.title} / ${item.creator}`}
            >
              <img alt="" className="album-art" src={item.visual} />
            </article>
          ) : activeCollection.id === 'movies' ? (
            <article
              aria-label={`${item.title} by ${item.creator}`}
              className="movie-poster-card"
              key={item.id}
              title={`${item.title} / ${item.creator}`}
            >
              <img alt="" className="movie-poster" src={item.visual} />
            </article>
          ) : (
            <article className="project-card collection-card" key={item.title}>
              <p>{item.meta}</p>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </article>
          ),
        )}
      </div>
    </section>
  )
}
