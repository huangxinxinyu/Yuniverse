<template>
  <div class="intro-section">
    <h1 class="name-title">{{ t.name }}</h1>
    <h2 class="job-title">{{ t.title }}</h2>
    <p class="intro-description">{{ t.description }}</p>
  </div>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t } = storeToRefs(store)
</script>

<style scoped>
.intro-section {
  margin-top: 4rem;
  margin-bottom: 3rem;
  max-width: 450px;
}

.name-title {
  font-size: 3.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.1;
}

.job-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 2rem;
  line-height: 1.2;
}

.intro-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .intro-section {
    text-align: center;
    max-width: 100%;
    margin: 2rem auto;
  }

  .name-title {
    font-size: 2.5rem;
  }

  .job-title {
    font-size: 1.5rem;
  }
}
</style>