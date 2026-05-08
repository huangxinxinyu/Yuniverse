<template>
  <div class="portfolio-container">
    <LeftPanel />
    <RightPanel />
    <LanguageToggle />
    <RocketCursor
        :color="'#38bdf8'"
        :size="44"
        :trail="true"
        :trail-length="38"
        :speed="0.28"
        :enabled="true"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import LeftPanel from '@/components/LeftPanel.vue'
import RightPanel from '@/components/RightPanel.vue'
import LanguageToggle from '@/components/LanguageToggle.vue'
import RocketCursor from '@/components/RocketCursor.vue'

const store = usePortfolioStore()

onMounted(() => {
  // Initialize preferences
  store.initializePreferences()
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
