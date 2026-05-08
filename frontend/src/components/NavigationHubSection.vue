<template>
  <section
    id="hub"
    class="content-section"
    :class="{ active: activeSection === 'hub' }"
  >
    <h3 class="section-title">{{ t.hub.title }}</h3>
    <div class="hub-grid">
      <a
        v-for="item in t.hub.items"
        :key="item.label"
        class="hub-link"
        :href="item.href || `#${item.target}`"
        :target="item.href && item.href.startsWith('http') ? '_blank' : undefined"
        :rel="item.href && item.href.startsWith('http') ? 'noopener noreferrer' : undefined"
        @click="handleClick($event, item)"
      >
        <span>{{ item.label }}</span>
        <p>{{ item.description }}</p>
      </a>
    </div>
  </section>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { useScrollspy } from '@/composables/useScrollspy'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)
const { scrollToSection } = useScrollspy()

const handleClick = (event, item) => {
  if (!item.target) return
  event.preventDefault()
  scrollToSection(item.target)
}
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
  margin-bottom: 1rem;
}

.hub-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.hub-link {
  display: block;
  min-height: 6rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  background:
    linear-gradient(135deg, rgba(255, 215, 0, 0.08), transparent),
    rgba(255, 255, 255, 0.035);
  text-decoration: none;
  transition: transform var(--transition-base), background var(--transition-base), border-color var(--transition-base);
}

.hub-link span {
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 700;
}

.hub-link p {
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.5;
  margin-top: 0.35rem;
}

.hub-link:hover {
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.4);
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .hub-grid {
    grid-template-columns: 1fr;
  }
}
</style>
