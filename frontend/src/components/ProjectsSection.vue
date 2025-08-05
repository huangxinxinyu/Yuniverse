<template>
  <section
      id="projects"
      class="content-section"
      :class="{ active: activeSection === 'projects' }"
  >
    <div
        v-for="project in t.projects.items"
        :key="project.id"
        class="project-item"
    >
      <h4 class="project-title">{{ project.title }}</h4>
      <p class="project-description">{{ project.description }}</p>
      <div class="tech-tags">
        <span
            v-for="tech in project.tech"
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
  margin-bottom: 5rem;
  opacity: 0.6;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.project-item {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all var(--transition-base);
  cursor: pointer;
}

.project-item:hover {
  background: var(--bg-secondary);
  box-shadow: var(--hover-shadow);
  transform: translateY(-2px);
}

.project-item:last-child {
  margin-bottom: 0;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.8rem;
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(255, 215, 0, 0.1);
  color: var(--primary-color);
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .project-item {
    padding: 1.2rem;
  }

  .project-title {
    font-size: 1rem;
  }

  .project-description {
    font-size: 0.85rem;
  }
}
</style>