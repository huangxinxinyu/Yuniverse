import { createI18n } from 'vue-i18n'
import { portfolioContent } from '@/data/portfolio'

// Create i18n instance with options
const i18n = createI18n({
    locale: 'en', // default locale
    fallbackLocale: 'en',
    messages: portfolioContent,
    legacy: false, // Use Composition API mode
    globalInjection: true
})

export default i18n