<template>
  <nav class="scrollspy-nav">
    <div
        v-for="sectionId in sectionIds"
        :key="sectionId"
        class="nav-item"
        :class="{ active: activeSection === sectionId }"
        @click="scrollToSection(sectionId)"
    >
      <div class="nav-line"></div>
      <span class="nav-text">{{ t.nav[sectionId] }}</span>
    </div>
  </nav>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'
import { useScrollspy } from '@/composables/useScrollspy'

const store = usePortfolioStore()
const { t, activeSection, sectionIds } = storeToRefs(store)

const { scrollToSection } = useScrollspy()
</script>

<style scoped>
.scrollspy-nav {
  margin: 1.1rem 0 1.5rem;
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
  letter-spacing: 0.08em;
}

.nav-line {
  width: 2rem;
  height: 1px;
  background: rgba(235, 232, 222, 0.26);
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
  background: var(--accent-red);
}

.nav-item:hover .nav-text,
.nav-item.active .nav-text {
  color: var(--text-primary);
}

@media (max-width: 1024px) {
  .scrollspy-nav {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    margin: 1.5rem 0 0;
    padding-bottom: 0.25rem;
  }

  .nav-item {
    flex: 0 0 auto;
    padding: 0.45rem 0;
  }

  .nav-line {
    display: none;
  }

  .nav-text {
    border: 1px solid var(--border-color);
    border-radius: 999px;
    padding: 0.45rem 0.75rem;
    background: rgba(235, 232, 222, 0.04);
  }

  .nav-item.active .nav-text,
  .nav-item:hover .nav-text {
    color: var(--text-primary);
    background: rgba(214, 66, 50, 0.18);
    border-color: var(--accent-red);
  }
}
</style>
