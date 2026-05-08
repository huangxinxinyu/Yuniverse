<template>
  <section
    id="journey"
    class="content-section"
    :class="{ active: activeSection === 'journey' }"
  >
    <h3 class="section-title">{{ t.journey.title }}</h3>
    <div class="journey-list">
      <article v-for="item in t.journey.items" :key="item.period" class="journey-item">
        <span class="journey-period">{{ item.period }}</span>
        <div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)
</script>

<style scoped>
.content-section {
  margin-bottom: 5rem;
  opacity: 0.72;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.4rem;
  margin-bottom: 1.4rem;
}

.journey-list {
  display: grid;
  gap: 1rem;
}

.journey-item {
  position: relative;
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  gap: 1rem;
  padding: 1.1rem 0 1.1rem 1.2rem;
  border-top: 1px solid var(--border-color);
}

.journey-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1.45rem;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--primary-color);
  box-shadow: 0 0 16px rgba(214, 66, 50, 0.34);
}

.journey-period {
  color: var(--accent-cool);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.journey-item h4 {
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 0.35rem;
}

.journey-item p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.65;
}

@media (max-width: 640px) {
  .journey-item {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>
