import type { MouseEvent } from 'react'
import type { RoutePath } from '../App'
import { navItems, profile } from '../data/siteContent'

type SiteNavProps = {
  currentPath: RoutePath
  onNavigate?: (path: RoutePath) => void
}

export function SiteNav({ currentPath, onNavigate }: SiteNavProps) {
  const handleClick =
    (href: RoutePath) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!onNavigate) {
        return
      }

      event.preventDefault()
      onNavigate(href)
    }

  return (
    <header className="site-header">
      <a
        className="identity"
        href="/home"
        aria-label={`${profile.name} home`}
        onClick={handleClick('/home')}
      >
        <span className="identity-mark" aria-hidden="true">
          <img src="/favicon.png" alt="" />
        </span>
        <span>{profile.name}</span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a
          className={currentPath === '/home' ? 'is-active' : undefined}
          href="/home"
          onClick={handleClick('/home')}
        >
          Home
        </a>
        {navItems.map((item) => (
          <a
            className={currentPath === item.href ? 'is-active' : undefined}
            key={item.href}
            href={item.href}
            onClick={handleClick(item.href)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
