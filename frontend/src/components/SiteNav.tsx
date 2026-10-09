import type { MouseEvent } from 'react'
import type { RoutePath } from '../App'
import { useSiteContent } from '../content/useSiteContent'
import { htmlLang, locales, type Locale } from '../i18n/locale'

type SiteNavProps = {
  currentPath: RoutePath
  onNavigate?: (path: RoutePath) => void
  onLocaleChange?: (locale: Locale) => void
}

const localeLabels: Record<Locale, string> = {
  zh: '中',
  en: 'EN',
}

export function SiteNav({ currentPath, onNavigate, onLocaleChange }: SiteNavProps) {
  const { locale, navigationItems, profile, ui } = useSiteContent()
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
        aria-label={ui.nav.homeAria(profile.name)}
        onClick={handleClick('/home')}
      >
        <span className="identity-mark" aria-hidden="true">
          <img src="/favicon.png" alt="" />
        </span>
        <span>{profile.name}</span>
      </a>
      <div className="site-header-controls">
        <nav className="site-nav" aria-label={ui.nav.primaryAria}>
          <a
            className={currentPath === '/home' ? 'is-active' : undefined}
            href="/home"
            onClick={handleClick('/home')}
          >
            {ui.nav.home}
          </a>
          {navigationItems.map((item) => (
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
        <div className="locale-switch" role="group" aria-label={ui.nav.languageAria}>
          {locales.map((option) => (
            <button
              aria-label={ui.nav.languageNames[option]}
              aria-pressed={option === locale}
              className="locale-option"
              key={option}
              lang={htmlLang[option]}
              onClick={() => onLocaleChange?.(option)}
              type="button"
            >
              {localeLabels[option]}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
