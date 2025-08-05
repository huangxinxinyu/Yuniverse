<template>
  <nav class="scrollspy-nav">
    <div
        v-for="section in sections"
        :key="section.id"
        class="nav-item"
        :class="{ active: activeSection === section.id }"
        @click="scrollToSection(section.id)"
    >
      <div class="nav-line"></div>
      <span class="nav-text">{{ t.nav[section.id] }}</span>
    </div>
  </nav>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'
import { useScrollspy } from '@/composables/useScrollspy'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)

const sections = [
  { id: 'about' },
  { id: 'experience' },
  { id: 'projects' }
]

const { scrollToSection } = useScrollspy()
</script>

<style scoped>
.scrollspy-nav {
  margin: 2rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  cursor: pointer;
  transition: all var(--transition-base);
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.nav-line {
  width: 2rem;
  height: 1px;
  background: var(--text-secondary);
  margin-right: 1rem;
  transition: all var(--transition-base);
}

.nav-text {
  color: var(--text-secondary);
  transition: all var(--transition-base);
}

.nav-item:hover .nav-line,
.nav-item.active .nav-line {
  width: 4rem;
  background: var(--primary-color);
}

.nav-item:hover .nav-text,
.nav-item.active .nav-text {
  color: var(--primary-color);
}

@media (max-width: 1024px) {
  .scrollspy-nav {
    display: none;
  }
}
</style>