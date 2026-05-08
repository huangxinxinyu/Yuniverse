<template>
  <section
    id="shelf"
    class="content-section"
    :class="{ active: activeSection === 'shelf' }"
  >
    <h3 class="section-title">{{ t.shelf.title }}</h3>
    <p class="section-intro">{{ t.shelf.intro }}</p>
    <div class="shelf-grid">
      <article v-for="group in t.shelf.groups" :key="group.title" class="shelf-card">
        <h4>{{ group.title }}</h4>
        <ul>
          <li v-for="item in group.items" :key="item">{{ item }}</li>
        </ul>
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
  margin-bottom: 0.6rem;
}

.section-intro {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.65;
  margin-bottom: 1.2rem;
}

.shelf-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.shelf-card {
  border: 1px solid var(--border-color);
  border-radius: 0.35rem;
  padding: 1rem;
  background:
    linear-gradient(135deg, rgba(120, 166, 200, 0.08), transparent),
    var(--surface-raised);
}

.shelf-card h4 {
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.shelf-card ul {
  color: var(--text-secondary);
  line-height: 1.65;
  margin-left: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .shelf-grid {
    grid-template-columns: 1fr;
  }
}
</style>
