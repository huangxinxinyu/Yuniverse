import type { MouseEvent } from 'react'
import type { RoutePath } from '../App'
import { TagList } from '../components/TagList'
import { blogPosts } from '../content/siteContent'

type BlogPostPageProps = {
  slug: string
  onNavigate?: (path: RoutePath) => void
}

export function BlogPostPage({ slug, onNavigate }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === slug) ?? blogPosts[0]
  const handleBackClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate) {
      return
    }

    event.preventDefault()
    onNavigate('/blog')
  }

  return (
    <article
      aria-labelledby="blog-post-title"
      className="content-section page-section blog-post-page"
      data-page="blog-post"
      id="blog"
    >
      <a className="text-command secondary" href="/blog" onClick={handleBackClick}>
        Back to blog
      </a>
      <p className="section-kicker">{`${post.categoryLabel} / ${post.date}`}</p>
      <h2 id="blog-post-title">{post.title}</h2>
      <p className="blog-post-summary">{post.excerpt}</p>
      <TagList tags={post.tags} />
      {post.aiDisclosure ? (
        <p className="ai-disclosure">{post.aiDisclosure}</p>
      ) : null}
      <div className="blog-post-body">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
