import { createContext, useContext } from 'react'

export const locales = ['zh', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'zh'

const localeStorageKey = 'yuniverse:locale'
const localeQueryKey = 'lang'

export const htmlLang: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
}

export const documentTitles: Record<Locale, string> = {
  zh: '黄新宇 | Yuniverse Lab',
  en: 'Xinyu Huang | Yuniverse Lab',
}

export const LocaleContext = createContext<Locale>(defaultLocale)

export const useLocale = () => useContext(LocaleContext)

export const isLocale = (value: unknown): value is Locale =>
  locales.includes(value as Locale)

const readStoredLocale = (): Locale | null => {
  try {
    const stored = window.localStorage.getItem(localeStorageKey)
    return isLocale(stored) ? stored : null
  } catch {
    return null
  }
}

// The ?lang= query wins so shared links open in the sender's language,
// then the visitor's last choice, then the browser language.
export const resolveInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  const queryLocale = new URLSearchParams(window.location.search).get(localeQueryKey)

  if (isLocale(queryLocale)) {
    return queryLocale
  }

  const storedLocale = readStoredLocale()

  if (storedLocale) {
    return storedLocale
  }

  const browserLanguages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language]

  return browserLanguages.some((language) => language?.toLowerCase().startsWith('zh'))
    ? 'zh'
    : 'en'
}

export const persistLocale = (locale: Locale) => {
  try {
    window.localStorage.setItem(localeStorageKey, locale)
  } catch {
    // The choice still applies for this visit when storage is unavailable.
  }
}

// Keeps an explicit ?lang= in the address bar across in-app navigation.
export const toLocalizedUrl = (path: string, locale: Locale): string => {
  if (typeof window === 'undefined') {
    return path
  }

  return new URLSearchParams(window.location.search).has(localeQueryKey)
    ? `${path}?${localeQueryKey}=${locale}`
    : path
}

export const replaceUrlLocale = (locale: Locale) => {
  const url = new URL(window.location.href)
  url.searchParams.set(localeQueryKey, locale)
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
}
