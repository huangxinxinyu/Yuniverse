<template>
  <div class="social-links">
    <a :href="t.social.email" class="social-link" title="Email">
      <span>📧</span>
    </a>
    <a :href="t.social.linkedin" class="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
      <span>💼</span>
    </a>
    <a :href="t.social.github" class="social-link" title="GitHub" target="_blank" rel="noopener noreferrer">
      <span>🐙</span>
    </a>
    <a :href="t.social.instagram" class="social-link" title="Instagram" target="_blank" rel="noopener noreferrer">
      <span>📸</span>
    </a>
  </div>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t } = storeToRefs(store)
</script>

<style scoped>
.social-links {
  display: flex;
  gap: 1.5rem;
  margin-top: auto;
  padding-bottom: 2rem;
}

.social-link {
  color: var(--text-secondary);
  font-size: 1.5rem;
  transition: all var(--transition-base);
  text-decoration: none;
}

.social-link:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .social-links {
    justify-content: center;
    margin-top: 2rem;
  }
}
</style>