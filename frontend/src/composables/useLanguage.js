import { ref, computed } from 'vue'
import { portfolioData } from '@/data/portfolio'

export function useLanguage() {
    const currentLang = ref('en')

    const initLanguage = () => {
        const savedLang = localStorage.getItem('language')
        if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
            currentLang.value = savedLang
        }
    }

    const toggleLanguage = () => {
        currentLang.value = currentLang.value === 'en' ? 'zh' : 'en'
        localStorage.setItem('language', currentLang.value)
    }

    const t = computed(() => portfolioData[currentLang.value])

    return {
        currentLang,
        t,
        initLanguage,
        toggleLanguage
    }
}