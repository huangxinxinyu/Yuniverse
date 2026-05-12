import { useEffect, useState } from 'react'
import { SiteNav } from './components/SiteNav'
import { AboutPage } from './pages/AboutPage'
import { BlogPage } from './pages/BlogPage'
import { CollectionPage } from './pages/CollectionPage'
import { HomePage } from './pages/HomePage'
import { LifePage } from './pages/LifePage'
import { WorkPage } from './pages/WorkPage'
import './App.css'

const routePaths = ['/', '/about', '/work', '/life', '/blog', '/collection'] as const

export type RoutePath = (typeof routePaths)[number]

export type PageProps = {
  onNavigate?: (path: RoutePath) => void
}

type AppProps = {
  initialPath?: string
}

const normalizePath = (path: string): RoutePath => {
  const cleanPath = path.split(/[?#]/)[0] || '/'

  return routePaths.includes(cleanPath as RoutePath) ? (cleanPath as RoutePath) : '/'
}

function QuietLayer() {
  return <div className="quiet-layer" aria-hidden="true"></div>
}

function App({ initialPath }: AppProps) {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
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
  ) : currentPath === '/about' ? (
      <AboutPage />
    ) : currentPath === '/work' ? (
      <WorkPage />
    ) : currentPath === '/life' ? (
      <LifePage />
    ) : currentPath === '/blog' ? (
      <BlogPage />
    ) : currentPath === '/collection' ? (
      <CollectionPage />
    ) : (
      <HomePage {...pageProps} />
    )

  return (
    <div className="site-shell">
      <QuietLayer />
      <SiteNav currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="page-shell" data-route={currentPath}>
        {page}
      </main>
    </div>
  )
}

export default App
