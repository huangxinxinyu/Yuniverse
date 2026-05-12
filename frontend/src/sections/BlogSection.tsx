import { SectionHeading } from '../components/SectionHeading'
import { siteSections } from '../data/siteContent'

export function BlogSection() {
  const section = siteSections.blog

  return (
    <section className="content-section" id={section.id}>
      <SectionHeading {...section} />
      <div className="post-list">
        {section.posts.map((post) => (
          <article className="project-card post-card" key={post.title}>
            <p>{`${post.date} / ${post.readingTime}`}</p>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <ul aria-label={`${post.title} tags`}>
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
