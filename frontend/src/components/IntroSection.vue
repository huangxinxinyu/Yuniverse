<template>
  <div class="intro-section">
    <h1 class="name-title">{{ t.name }}</h1>
    <h2 class="job-title">
      <span v-for="line in titleLines" :key="line">{{ line }}</span>
    </h2>
    <p class="intro-description">{{ t.description }}</p>
    <div class="intro-actions">
      <a :href="t.resume.href" class="intro-action primary" target="_blank" rel="noopener noreferrer">
        {{ t.resume.label }}
      </a>
      <a :href="`mailto:${t.social.email}`" class="intro-action">
        {{ t.ui.contactAction }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = usePortfolioStore()
const { t } = storeToRefs(store)

const titleLines = computed(() => Array.isArray(t.value.title) ? t.value.title : [t.value.title])
</script>

<style scoped>
.intro-section {
  margin-top: 3rem;
  margin-bottom: 2.5rem;
  max-width: 450px;
}

.name-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.1;
}

.job-title {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.intro-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.intro-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.intro-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.55rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.intro-action.primary {
  background: var(--primary-color);
  color: var(--bg-primary);
  border-color: var(--primary-color);
}

.intro-action:hover {
  transform: translateY(-2px);
  text-shadow: none;
}

@media (max-width: 1024px) {
  .intro-section {
    text-align: center;
    max-width: 100%;
    margin: 2rem auto;
  }

  .name-title {
    font-size: 2.2rem;
  }

  .job-title {
    font-size: 1.4rem;
  }

  .intro-description {
    font-size: 0.9rem;
  }

  .intro-actions {
    justify-content: center;
  }
}
</style>
