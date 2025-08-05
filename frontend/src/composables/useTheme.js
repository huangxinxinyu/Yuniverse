import { ref, watchEffect } from 'vue'

export function useTheme() {
    const isDarkMode = ref(true)

    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            isDarkMode.value = savedTheme === 'dark'
        }
        updateTheme()
    }

    const updateTheme = () => {
        document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light')
    }

    const toggleTheme = () => {
        isDarkMode.value = !isDarkMode.value
        localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    }

    watchEffect(() => {
        updateTheme()
    })

    return {
        isDarkMode,
        initTheme,
        toggleTheme
    }
}