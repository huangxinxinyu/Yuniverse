import type { MouseEvent, ReactNode } from 'react'
import type { RoutePath } from '../App'
import { TagList } from '../components/TagList'
import { blogPosts } from '../content/siteContent'

type BlogPostPageProps = {
  slug: string
  onNavigate?: (path: RoutePath) => void
}

const inlineLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s<]+)/g
const trailingUrlPunctuation = /[.,;!?，。；！？、]+$/

function renderExternalLink(href: string, label: string, key: string) {
  return (
    <a href={href} key={key} rel="noreferrer" target="_blank">
      {label}
    </a>
  )
}

function renderInlineContent(text: string): ReactNode {
  const nodes: ReactNode[] = []
  let lastIndex = 0

  for (const match of text.matchAll(inlineLinkPattern)) {
    const matchIndex = match.index ?? 0

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex))
    }

    const [, markdownLabel, markdownHref, rawHref] = match

    if (markdownHref) {
      nodes.push(
        renderExternalLink(
          markdownHref,
          markdownLabel,
          `${markdownHref}-${matchIndex}`,
        ),
      )
    } else if (rawHref) {
      const href = rawHref.replace(trailingUrlPunctuation, '')
      const trailingText = rawHref.slice(href.length)

      nodes.push(renderExternalLink(href, href, `${href}-${matchIndex}`))

      if (trailingText) {
        nodes.push(trailingText)
      }
    }

    lastIndex = matchIndex + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes.length > 0 ? nodes : text
}

function renderContentBlock(block: string) {
  if (block.startsWith('```')) {
    const [fence, ...codeLines] = block.split('\n')
    const language = fence.replace('```', '').trim() || 'text'
    const code = codeLines.join('\n').replace(/\n```$/, '')

    return (
      <pre className="blog-code-block" key={block}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    )
  }

  if (block.startsWith('## ')) {
    return <h3 key={block}>{renderInlineContent(block.replace(/^## /, ''))}</h3>
  }

  if (block.startsWith('- ')) {
    return (
      <ul className="blog-markdown-list" key={block}>
        {block.split('\n').map((item) => (
          <li key={item}>{renderInlineContent(item.replace(/^- /, ''))}</li>
        ))}
      </ul>
    )
  }

  return <p key={block}>{renderInlineContent(block)}</p>
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
        {post.content.map(renderContentBlock)}
      </div>
    </article>
  )
}
