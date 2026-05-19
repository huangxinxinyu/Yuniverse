import { useEffect, useState } from 'react'
import { SiteNav } from './components/SiteNav'
import { AboutPage } from './pages/AboutPage'
import { BlogPage } from './pages/BlogPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { CollectionPage } from './pages/CollectionPage'
import { HomePage } from './pages/HomePage'
import { IntroPage } from './pages/IntroPage'
import { LifePage } from './pages/LifePage'
import { WorkPage } from './pages/WorkPage'
import './App.css'

const routePaths = ['/', '/about', '/work', '/life', '/blog', '/collection'] as const
const previewPaths = ['/intro'] as const

export type RoutePath = (typeof routePaths)[number]

export type PageProps = {
  onNavigate?: (path: RoutePath) => void
}

type AppProps = {
  initialPath?: string
}

const normalizePath = (path: string): string => {
  const cleanPath = path.split(/[?#]/)[0] || '/'

  return routePaths.includes(cleanPath as RoutePath) ||
    previewPaths.includes(cleanPath as (typeof previewPaths)[number]) ||
    cleanPath.startsWith('/blog/')
    ? cleanPath
    : '/'
}

function QuietLayer() {
  return <div className="quiet-layer" aria-hidden="true"></div>
}

function App({ initialPath }: AppProps) {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(
      initialPath ??
        (typeof window === 'undefined' ? '/' : window.location.pathname),
    ),
  )

  useEffect(() => {
    if (initialPath || typeof window === 'undefined') {
      return
    }

    const handlePopState = () => setCurrentPath(normalizePath(window.location.pathname))

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [initialPath])

  const handleNavigate = (path: RoutePath) => {
    setCurrentPath(path)

    if (!initialPath && typeof window !== 'undefined') {
      window.history.pushState({}, '', path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const pageProps: PageProps = { onNavigate: handleNavigate }
  const isIntroPath = currentPath === '/intro'
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
      <LifePage />
      <BlogPage />
      <CollectionPage />
    </>
  ) : isIntroPath ? (
      <IntroPage />
  ) : currentPath === '/about' ? (
      <AboutPage />
    ) : currentPath === '/work' ? (
      <WorkPage />
    ) : currentPath === '/life' ? (
      <LifePage />
    ) : currentPath === '/blog' ? (
      <BlogPage />
    ) : blogPostSlug ? (
      <BlogPostPage slug={blogPostSlug} onNavigate={handleNavigate} />
    ) : currentPath === '/collection' ? (
      <CollectionPage />
    ) : (
      <HomePage {...pageProps} />
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
    </div>
  )
}

export default App
