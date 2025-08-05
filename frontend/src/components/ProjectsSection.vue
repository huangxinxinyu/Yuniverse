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
      <div class="project-links">
        <a
            v-if="project.github"
            :href="project.github"
            class="project-link"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
        >
          🔗
        </a>
        <a
            v-if="project.demo"
            :href="project.demo"
            class="project-link"
            target="_blank"
            rel="noopener noreferrer"
            title="Live Demo"
        >
          🚀
        </a>
      </div>
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
  margin-bottom: 6rem;
  opacity: 0.6;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.project-item {
  margin-bottom: 3rem;
  padding: 2rem;
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
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.project-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1.2rem;
  transition: all var(--transition-base);
}

.project-link:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
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
  .project-item {
    padding: 1.5rem;
  }

  .project-title {
    font-size: 1.1rem;
  }
}
</style>