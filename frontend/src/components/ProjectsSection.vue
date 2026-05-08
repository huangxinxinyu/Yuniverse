<template>
  <section
      id="projects"
      class="content-section"
      :class="{ active: activeSection === 'projects' }"
  >
    <h3 class="section-title">{{ t.projects.title }}</h3>
    <div
        v-for="project in t.projects.items"
        :key="project.id"
        class="project-item"
    >
      <h4 class="project-title">{{ project.title }}</h4>
      <ul v-if="Array.isArray(project.description)" class="project-description-list">
        <li v-for="description in project.description" :key="description">
          {{ description }}
        </li>
      </ul>
      <p v-else class="project-description">{{ project.description }}</p>
      <div class="tech-tags">
        <span
            v-for="tech in project.tech"
            :key="tech"
            class="tech-tag"
        >
          {{ tech }}
        </span>
      </div>
      <div class="project-links">
        <a
          v-if="project.github && project.github !== '#'"
          :href="project.github"
          target="_blank"
          class="project-link"
          @click.stop
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          Link
        </a>
        <a
          v-if="project.demo && project.demo !== '#'"
          :href="project.demo"
          target="_blank"
          class="project-link"
          @click.stop
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Demo
        </a>
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

.section-title {
  color: var(--text-primary);
  font-size: 1.4rem;
  margin-bottom: 1rem;
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

.project-description-list {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 1rem 1.1rem;
  padding: 0;
  font-size: 0.9rem;
}

.project-description-list li {
  margin-bottom: 0.5rem;
}

.project-description-list li:last-child {
  margin-bottom: 0;
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

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  text-decoration: none;
  transition: color var(--transition-base);
}

.project-link:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .project-item {
    padding: 1.2rem;
  }

  .project-title {
    font-size: 1rem;
  }

  .project-description,
  .project-description-list {
    font-size: 0.85rem;
  }
}
</style>
