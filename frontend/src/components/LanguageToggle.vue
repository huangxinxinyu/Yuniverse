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
  background: rgba(8, 10, 13, 0.78);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.55rem 0.75rem;
  border-radius: 0.12rem;
  cursor: pointer;
  transition: all var(--transition-base);
  z-index: var(--z-modal);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.lang-toggle:hover {
  background: var(--accent-red);
  color: var(--text-primary);
  border-color: var(--accent-red);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .lang-toggle {
    bottom: 5rem;
    right: 1rem;
  }
}
</style>
