import { blogPosts } from '../content/siteContent'
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
const publishedPosts = blogPosts.filter((post) => post.status === 'published')
const categoryCounts = [
  { label: 'Software', count: publishedPosts.filter((post) => post.category === 'software').length },
  { label: 'Taste', count: publishedPosts.filter((post) => post.category === 'taste').length },
  { label: 'Notes', count: publishedPosts.filter((post) => post.category === 'notes').length },
]

export function BlogSiteSummary({ metrics, now = new Date() }: BlogSiteSummaryProps) {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const daysSinceLaunch = Math.max(0, Math.floor((today - siteLaunchDate) / 86_400_000))
  const rows = [
    { label: '文章数', value: String(publishedPosts.length) },
    { label: '建站天数', value: `${daysSinceLaunch} 天` },
    { label: '访问量', value: metrics?.views.toLocaleString('en-US') ?? '—' },
    { label: '访客数', value: metrics?.visitors.toLocaleString('en-US') ?? '—' },
  ]

  return (
    <aside aria-label="网站概览" className="blog-site-summary">
      <BlogDeskPet />
      <div className="blog-site-summary-card">
        <p className="panel-label">Yuniverse / At a glance</p>
        <div aria-label="文章分类" className="blog-summary-categories">
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
        <p className="blog-summary-footnote">访问统计从启用后开始记录</p>
      </div>
    </aside>
  )
}
