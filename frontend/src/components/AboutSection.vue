<template>
  <section
      id="about"
      class="content-section"
      :class="{ active: activeSection === 'about' }"
  >
    <div class="about-content">
      <p v-for="(paragraph, index) in t.about.content" :key="index">
        {{ paragraph }}
      </p>
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
  opacity: 0.6;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.about-content {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.about-content p {
  margin-bottom: 1.2rem;
}

.about-content p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .content-section {
    margin-bottom: 4rem;
  }

  .about-content {
    font-size: 0.9rem;
    line-height: 1.6;
  }
}
</style>