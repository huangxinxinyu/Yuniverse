<template>
  <button
      class="lang-toggle"
      @click="toggleLanguage"
  >
    {{ t.ui.langToggle }}
  </button>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t } = storeToRefs(store)
const { toggleLanguage } = store
</script>

<style scoped>
.lang-toggle {
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: all var(--transition-base);
  z-index: var(--z-modal);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.lang-toggle:hover {
  background: var(--primary-color);
  color: var(--bg-primary);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .lang-toggle {
    bottom: 5rem;
    right: 1rem;
  }
}
</style>