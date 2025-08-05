<template>
  <button
      class="theme-toggle"
      @click="toggleTheme"
      :title="t.ui.themeToggle"
  >
    {{ isDarkMode ? '☀️' : '🌙' }}
  </button>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { isDarkMode, t } = storeToRefs(store)
const { toggleTheme } = store
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-base);
  z-index: var(--z-modal);
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.theme-toggle:hover {
  background: var(--primary-color);
  color: var(--bg-primary);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .theme-toggle {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>