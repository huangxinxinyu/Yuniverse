import { useState, type MouseEvent } from 'react'
import {
  blogCategories,
  siteSections,
  type BlogCategoryId,
} from '../content/siteContent'

type BlogPageProps = {
  initialFilter?: BlogCategoryId
  initialPage?: number
}

const postsPerPage = 6

export function BlogPage({
  initialFilter = 'all',
  initialPage = 1,
}: BlogPageProps = {}) {
  const section = siteSections.blog
  const [activeFilter, setActiveFilter] = useState<BlogCategoryId>(initialFilter)
  const [activePage, setActivePage] = useState(() => Math.max(1, initialPage))
  const visiblePosts =
    activeFilter === 'featured'
      ? [section.featuredPost]
      : activeFilter === 'all'
        ? section.posts
        : activeFilter === 'future'
          ? []
          : section.posts.filter((post) => post.category === activeFilter)
  const pageCount = Math.max(1, Math.ceil(visiblePosts.length / postsPerPage))
  const currentPage = Math.min(activePage, pageCount)
  const paginatedPosts = visiblePosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  )
  const showPagination = visiblePosts.length > postsPerPage
  const activeCategory =
    blogCategories.find((category) => category.id === activeFilter) ??
    blogCategories[0]
  const handleFilterClick = (categoryId: BlogCategoryId) => {
    setActiveFilter(categoryId)
    setActivePage(1)
  }
  const handlePageClick = (page: number) => {
    setActivePage(page)

    if (typeof window === 'undefined') {
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
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
            onClick={() => handleFilterClick(category.id)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="blog-filter-summary">
        <span className="panel-label">{activeCategory.label}</span>
        <p>{activeCategory.description}</p>
      </div>

      {paginatedPosts.length > 0 ? (
        <>
          <div className="post-list blog-index">
            {paginatedPosts.map((post) => (
              <article className="mini-card post-card" key={post.slug}>
                <div className="post-card-meta">
                  <span>{post.date}</span>
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

          {showPagination ? (
            <nav className="blog-pagination" aria-label="Blog pagination">
              {currentPage > 1 ? (
                <button
                  className="pagination-button"
                  onClick={() => handlePageClick(currentPage - 1)}
                  type="button"
                >
                  Previous
                </button>
              ) : null}
              <span className="pagination-status">
                {`Page ${currentPage} of ${pageCount}`}
              </span>
              <div className="pagination-pages" aria-label="Blog pages">
                {Array.from({ length: pageCount }, (_, index) => {
                  const page = index + 1

                  return (
                    <button
                      aria-current={page === currentPage ? 'page' : undefined}
                      aria-label={`Go to blog page ${page}`}
                      className="pagination-page-button"
                      data-page-button={page}
                      key={page}
                      onClick={() => handlePageClick(page)}
                      type="button"
                    >
                      {page}
                    </button>
                  )
                })}
              </div>
              {currentPage < pageCount ? (
                <button
                  className="pagination-button"
                  onClick={() => handlePageClick(currentPage + 1)}
                  type="button"
                >
                  Next
                </button>
              ) : null}
            </nav>
          ) : null}
        </>
      ) : null}
    </section>
  )
}
