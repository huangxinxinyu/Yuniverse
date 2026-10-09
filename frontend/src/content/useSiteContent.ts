import { useLocale } from '../i18n/locale'
import { getSiteContent } from './siteContent'

export const useSiteContent = () => getSiteContent(useLocale())
