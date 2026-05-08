<template>
  <div class="home-view">
    <section class="mission-home content-section active">
      <p class="section-kicker">PRIMARY INTERFACE / NAVIGATION FIRST</p>
      <h2 class="home-title">Explore the archive by page.</h2>
      <p class="home-copy">
        This front page is a command surface: pick a signal, enter a page, and let each archive grow separately.
      </p>
      <div class="home-grid">
        <RouterLink
          v-for="page in t.sitePages.slice(1)"
          :key="page.path"
          :to="page.path"
          class="home-card"
        >
          <span>{{ page.key }}</span>
          <strong>{{ page.title }}</strong>
          <p>{{ page.description }}</p>
        </RouterLink>
      </div>
    </section>

    <NavigationHubSection />
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolio'
import NavigationHubSection from '@/components/NavigationHubSection.vue'

const store = usePortfolioStore()
const { t } = storeToRefs(store)
</script>

<style scoped>
.home-title {
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 5vw, 5.4rem);
  line-height: 0.92;
  text-transform: uppercase;
  max-width: 9ch;
  margin-bottom: 1rem;
}

.home-copy {
  color: var(--text-secondary);
  max-width: 34rem;
  line-height: 1.75;
  margin-bottom: 1.4rem;
}

.home-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.home-card {
  border: 1px solid var(--border-color);
  background: var(--surface-raised);
  color: var(--text-primary);
  padding: 1rem;
  min-height: 9rem;
  text-decoration: none;
  clip-path: polygon(0 0, calc(100% - 0.65rem) 0, 100% 0.65rem, 100% 100%, 0.65rem 100%, 0 calc(100% - 0.65rem));
  transition: all var(--transition-base);
}

.home-card span {
  color: var(--accent-cool);
  display: block;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.home-card strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.2rem;
  text-transform: uppercase;
  margin-bottom: 0.45rem;
}

.home-card p {
  color: var(--text-secondary);
  font-size: 0.86rem;
  line-height: 1.55;
}

.home-card:hover {
  border-color: var(--accent-red);
  background: rgba(214, 66, 50, 0.14);
  transform: translateY(-3px);
}

@media (max-width: 680px) {
  .home-grid {
    grid-template-columns: 1fr;
  }
}
</style>
