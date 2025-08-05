<template>
  <section
      id="experience"
      class="content-section"
      :class="{ active: activeSection === 'experience' }"
  >
    <div
        v-for="item in t.experience.items"
        :key="item.id"
        class="experience-item"
    >
      <div class="experience-header">
        <div>
          <h4 class="experience-title">
            {{ item.title }} ·
            <span class="experience-company">{{ item.company }}</span>
          </h4>
        </div>
        <span class="experience-period">{{ item.period }}</span>
      </div>
      <p class="experience-description">{{ item.description }}</p>
      <div class="tech-tags">
        <span
            v-for="tech in item.tech"
            :key="tech"
            class="tech-tag"
        >
          {{ tech }}
        </span>
      </div>
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
  margin-bottom: 6rem;
  opacity: 0.6;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.experience-item {
  margin-bottom: 3rem;
  padding: 2rem;
  border-radius: 0.5rem;
  transition: all var(--transition-base);
  cursor: pointer;
}

.experience-item:hover {
  background: var(--bg-secondary);
  box-shadow: var(--hover-shadow);
  transform: translateY(-2px);
}

.experience-item:last-child {
  margin-bottom: 0;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.experience-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.experience-company {
  color: var(--primary-color);
  font-weight: 500;
}

.experience-period {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.experience-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(100, 255, 218, 0.1);
  color: var(--primary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

[data-theme="light"] .tech-tag {
  background: rgba(99, 102, 241, 0.1);
}

@media (max-width: 768px) {
  .experience-item {
    padding: 1.5rem;
  }

  .experience-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .experience-period {
    font-size: 0.8rem;
  }
}
</style>