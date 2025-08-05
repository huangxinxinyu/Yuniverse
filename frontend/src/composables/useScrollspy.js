import { usePortfolioStore } from '@/stores/portfolio'

export function useScrollspy() {
    const store = usePortfolioStore()

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            store.setActiveSection(sectionId)
        }
    }

    const updateActiveSection = () => {
        const sections = ['about', 'experience', 'projects']
        const scrollPosition = window.scrollY + window.innerHeight / 2

        for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i])
            if (element && element.offsetTop <= scrollPosition) {
                store.setActiveSection(sections[i])
                break
            }
        }
    }

    return {
        scrollToSection,
        updateActiveSection
    }
}