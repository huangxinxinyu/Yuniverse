import { useState, type MouseEvent } from 'react'
import {
  blogCategories,
  blogFilters,
  siteSections,
  type BlogCategoryId,
} from '../content/siteContent'

type StatusFilterId = (typeof blogFilters)[number]['id']
type ActiveBlogFilter = BlogCategoryId | StatusFilterId

export function BlogPage() {
  const section = siteSections.blog
  const [activeFilter, setActiveFilter] = useState<ActiveBlogFilter>('all')
  const visiblePosts =
    activeFilter === 'featured'
      ? [section.featuredPost]
      : activeFilter === 'all'
        ? section.posts
        : activeFilter === 'future'
          ? []
          : ['draft', 'planned', 'published'].includes(activeFilter)
            ? section.posts.filter((post) => post.status === activeFilter)
            : section.posts.filter((post) => post.category === activeFilter)
  const activeCategory =
    blogCategories.find((category) => category.id === activeFilter) ??
    blogCategories[0]
  const handlePostClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (typeof window === 'undefined') {
        return
      }

      event.preventDefault()
      window.history.pushState({}, '', href)
      window.dispatchEvent(new PopStateEvent('popstate'))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

  return (
    <section
      aria-labelledby="blog-title"
      className="content-section page-section blog-page"
      data-page="blog"
      id="blog"
    >
      <div className="blog-hero">
        <div>
          <p className="section-kicker">{section.kicker}</p>
          <h2 id="blog-title">{section.title}</h2>
          <p>{section.body}</p>
        </div>
        <aside
          aria-labelledby="featured-post-title"
          className="featured-post"
          data-featured="true"
        >
          <span className="panel-label">Featured post</span>
          <h3 id="featured-post-title">{section.featuredPost.title}</h3>
          <p>{section.featuredPost.excerpt}</p>
          <div className="post-footer">
            <span>{`${section.featuredPost.date} / ${section.featuredPost.readingTime}`}</span>
            <strong>{section.featuredPost.categoryLabel}</strong>
          </div>
        </aside>
      </div>

      <div className="filter-bar filter-row" aria-label="Blog categories">
        {blogCategories.map((category) => (
          <button
            aria-pressed={category.id === activeFilter}
            className="filter-button"
            data-category={category.id}
            data-filter={category.id}
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="filter-bar blog-status-row" aria-label="Blog status filters">
        {blogFilters.map((filter) => (
          <button
            aria-pressed={filter.id === activeFilter}
            className="filter-button"
            data-filter={filter.id}
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="blog-filter-summary">
        <span className="panel-label">{activeCategory.label}</span>
        <p>{activeCategory.description}</p>
      </div>

      {visiblePosts.length > 0 ? (
        <div className="post-list blog-index">
          {visiblePosts.map((post) => (
            <article className="mini-card post-card" key={post.slug}>
              <div className="post-card-meta">
                <span>{`${post.date} / ${post.status}`}</span>
                <strong>{post.categoryLabel}</strong>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <ul aria-label={`${post.title} tags`}>
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="post-footer">
                <span>{post.readingTime}</span>
                {post.featured ? <strong>Featured</strong> : null}
              </div>
              <a
                className="text-command secondary"
                href={post.href}
                onClick={handlePostClick(post.href)}
              >
                Read article
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state" role="status">
          <span className="panel-label">Future state</span>
          <p>{section.emptyState}</p>
        </div>
      )}

      <div className="empty-state blog-future-note" role="status">
        <span className="panel-label">Future state</span>
        <p>{section.emptyState}</p>
      </div>
    </section>
  )
}
