import { useEffect, useState } from 'react'
import type { SiteMetricCounts } from './components/BlogSiteSummary'
import { ContactFooter } from './components/ContactFooter'
import { SiteNav } from './components/SiteNav'
import { AboutPage } from './pages/AboutPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { CollectionPage } from './pages/CollectionPage'
import { HomePage } from './pages/HomePage'
import { IntroPage } from './pages/IntroPage'
import { WorkPage } from './pages/WorkPage'
import { getVisitorId } from './lib/visitorId'
import './App.css'

const routePaths = ['/home', '/about', '/work', '/blog', '/collection'] as const
const previewPaths = ['/intro'] as const
// Set to true to show the comet intro at the public root again.
const SHOW_INTRO_AT_ROOT = false

export type RoutePath = (typeof routePaths)[number]

export type PageProps = {
  onNavigate?: (path: RoutePath) => void
}

type AppProps = {
  initialPath?: string
  showIntroAtRoot?: boolean
}

const normalizePath = (path: string, showIntroAtRoot: boolean): string => {
  const cleanPath = path.split(/[?#]/)[0] || '/'

  if (routePaths.includes(cleanPath as RoutePath) ||
    previewPaths.includes(cleanPath as (typeof previewPaths)[number]) ||
    cleanPath.startsWith('/blog/')) {
    return cleanPath
  }

  return showIntroAtRoot ? '/' : '/home'
}

function QuietLayer() {
  return <div className="quiet-layer" aria-hidden="true"></div>
}

function App({ initialPath, showIntroAtRoot = SHOW_INTRO_AT_ROOT }: AppProps) {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(
      initialPath ??
        (typeof window === 'undefined' ? '/' : window.location.pathname),
      showIntroAtRoot,
    ),
  )
  const [siteMetrics, setSiteMetrics] = useState<SiteMetricCounts | null>(null)

  useEffect(() => {
    if (initialPath || typeof window === 'undefined') {
      return
    }

    const handlePopState = () => setCurrentPath(normalizePath(window.location.pathname, showIntroAtRoot))

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [initialPath, showIntroAtRoot])

  useEffect(() => {
    if (initialPath || typeof window === 'undefined') {
      return
    }

    const controller = new AbortController()

    fetch('/api/site-metrics', {
      body: JSON.stringify({ path: currentPath, visitorId: getVisitorId() }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Site metrics request failed with ${response.status}`)
        }
        return response.json() as Promise<SiteMetricCounts>
      })
      .then((counts) => {
        if (!controller.signal.aborted) {
          setSiteMetrics(counts)
        }
      })
      .catch(() => {
        // The site remains usable when anonymous metrics are unavailable.
      })

    return () => controller.abort()
  }, [currentPath, initialPath])

  const handleNavigate = (path: RoutePath) => {
    setCurrentPath(path)

    if (!initialPath && typeof window !== 'undefined') {
      window.history.pushState({}, '', path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const pageProps: PageProps = { onNavigate: handleNavigate }
  const isIntroPath = currentPath === '/' || currentPath === '/intro'
  const blogPostSlug = currentPath.startsWith('/blog/')
    ? currentPath.replace(/^\/blog\//, '')
    : null
  const navPath: RoutePath = blogPostSlug
    ? '/blog'
    : (currentPath as RoutePath)
  const shouldRenderFullOverview = !initialPath && typeof window === 'undefined'
  const page = shouldRenderFullOverview ? (
    <>
      <HomePage {...pageProps} />
      <AboutPage />
      <WorkPage />
      <BlogPage siteMetrics={siteMetrics} />
      <CollectionPage />
    </>
  ) : isIntroPath ? (
      <IntroPage />
  ) : currentPath === '/home' ? (
      <HomePage {...pageProps} />
    ) : currentPath === '/about' ? (
      <AboutPage />
    ) : currentPath === '/work' ? (
      <WorkPage />
    ) : currentPath === '/blog' ? (
      <BlogPage siteMetrics={siteMetrics} />
    ) : blogPostSlug ? (
      <BlogPostPage slug={blogPostSlug} onNavigate={handleNavigate} siteMetrics={siteMetrics} />
    ) : currentPath === '/collection' ? (
      <CollectionPage />
    ) : (
      <IntroPage />
    )

  if (isIntroPath) {
    return page
  }

  return (
    <div className="site-shell">
      <QuietLayer />
      <SiteNav currentPath={navPath} onNavigate={handleNavigate} />
      <main className="page-shell" data-route={currentPath}>
        {page}
      </main>
      <ContactFooter />
    </div>
  )
}

export default App
