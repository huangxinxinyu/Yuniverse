<template>
  <div class="site-shell">
    <header class="site-header">
      <RouterLink to="/" class="wordmark">Yuniverse</RouterLink>
      <nav class="top-nav" aria-label="Primary navigation">
        <RouterLink
          v-for="page in t.sitePages.slice(1)"
          :key="page.path"
          :to="page.path"
        >
          {{ page.title }}
        </RouterLink>
      </nav>
      <LanguageToggle />
    </header>

    <RouterView />

    <RocketCursor
      :color="'#d8d2c4'"
      :size="38"
      :trail="true"
      :trail-length="28"
      :speed="0.2"
      :enabled="true"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolio'
import LanguageToggle from '@/components/LanguageToggle.vue'
import RocketCursor from '@/components/RocketCursor.vue'

const store = usePortfolioStore()
const { t } = storeToRefs(store)

onMounted(() => {
  store.initializePreferences()
})
</script>

<style scoped>
.site-shell {
  min-height: 100vh;
  position: relative;
}

.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  padding: 1.15rem clamp(1rem, 4vw, 3.5rem);
  pointer-events: none;
}

.wordmark,
.top-nav,
.site-header :deep(.lang-toggle) {
  pointer-events: auto;
}

.wordmark {
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
}

.top-nav {
  justify-self: center;
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.8rem);
}

.top-nav a {
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
}

.top-nav a.router-link-active,
.top-nav a:hover {
  color: var(--text-primary);
}

@media (max-width: 760px) {
  .site-header {
    grid-template-columns: 1fr auto;
  }

  .top-nav {
    grid-column: 1 / -1;
    justify-self: start;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }
}
</style>
