<template>
  <div class="portfolio-container">
    <LeftPanel />
    <RightPanel />
    <ThemeToggle />
    <LanguageToggle />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import LeftPanel from '@/components/LeftPanel.vue'
import RightPanel from '@/components/RightPanel.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LanguageToggle from '@/components/LanguageToggle.vue'
import RocketCursor from 'rocket-cursor-component'

const store = usePortfolioStore()

onMounted(() => {
  // Initialize preferences
  store.initializePreferences()

  // Initialize Rocket Cursor
  new RocketCursor({
    color: '#64ffda',
    size: 20,
    trail: true
  })
})
</script>

<style scoped>
.portfolio-container {
  display: flex;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .portfolio-container {
    flex-direction: column;
  }
}
</style>