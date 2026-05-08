<template>
  <section
    id="moments"
    class="content-section"
    :class="{ active: activeSection === 'moments' }"
  >
    <h3 class="section-title">{{ t.moments.title }}</h3>
    <p class="section-intro">{{ t.moments.intro }}</p>
    <div class="moments-list">
      <span v-for="item in t.moments.items" :key="item" class="moment-pill">{{ item }}</span>
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

.moments-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.moment-pill {
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.45rem 0.85rem;
  font-size: 0.84rem;
}
</style>
