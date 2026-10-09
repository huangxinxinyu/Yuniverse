import { useSiteContent } from '../content/useSiteContent'
import { BlogDeskPet } from './BlogDeskPet'

export type SiteMetricCounts = {
  views: number
  visitors: number
}

type BlogSiteSummaryProps = {
  metrics?: SiteMetricCounts | null
  now?: Date
}

const siteLaunchDate = Date.UTC(2025, 7, 17)
const summaryCategories = ['software', 'taste', 'notes'] as const

export function BlogSiteSummary({ metrics, now = new Date() }: BlogSiteSummaryProps) {
  const { blogCategories, blogPosts, ui } = useSiteContent()
  const publishedPosts = blogPosts.filter((post) => post.status === 'published')
  const categoryCounts = summaryCategories.map((id) => ({
    label: blogCategories.find((category) => category.id === id)?.label ?? id,
    count: publishedPosts.filter((post) => post.category === id).length,
  }))
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const daysSinceLaunch = Math.max(0, Math.floor((today - siteLaunchDate) / 86_400_000))
  const rows = [
    { label: ui.summary.posts, value: String(publishedPosts.length) },
    { label: ui.summary.daysOnline, value: ui.summary.days(daysSinceLaunch) },
    { label: ui.summary.views, value: metrics?.views.toLocaleString('en-US') ?? '—' },
    { label: ui.summary.visitors, value: metrics?.visitors.toLocaleString('en-US') ?? '—' },
  ]

  return (
    <aside aria-label={ui.summary.aria} className="blog-site-summary">
      <BlogDeskPet />
      <div className="blog-site-summary-card">
        <p className="panel-label">{ui.summary.panelLabel}</p>
        <div aria-label={ui.summary.categoriesAria} className="blog-summary-categories">
          {categoryCounts.map(({ label, count }) => (
            <span key={label}>{label}<sup>{count}</sup></span>
          ))}
        </div>
        <dl aria-live="polite" className="blog-summary-stats">
          {rows.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="blog-summary-footnote">{ui.summary.footnote}</p>
      </div>
    </aside>
  )
}
