import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { portfolioData } from '@/data/portfolio'

export const usePortfolioStore = defineStore('portfolio', () => {
    // State
    const currentLang = ref('en')
    const isDarkMode = ref(true)
    const activeSection = ref('about')

    // Getters
    const t = computed(() => portfolioData[currentLang.value])

    // Actions
    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value
        document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
        localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    }

    const toggleLanguage = () => {
        currentLang.value = currentLang.value === 'en' ? 'zh' : 'en'
        localStorage.setItem('language', currentLang.value)
    }

    const setActiveSection = (section) => {
        activeSection.value = section
    }

    const initializePreferences = () => {
        // Initialize theme
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            isDarkMode.value = savedTheme === 'dark'
        }
        document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')

        // Initialize language
        const savedLang = localStorage.getItem('language')
        if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
            currentLang.value = savedLang
        }
    }

    return {
        currentLang,
        isDarkMode,
        activeSection,
        t,
        toggleTheme,
        toggleLanguage,
        setActiveSection,
        initializePreferences
    }
})