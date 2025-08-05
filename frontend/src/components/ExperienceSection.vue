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

    <!-- View Full Resume Button -->
    <div class="resume-section">
      <a
          href="/resume.pdf"
          class="resume-link"
          target="_blank"
          rel="noopener noreferrer"
      >
        View Full Résumé
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 17L17 7"></path>
          <path d="M7 7h10v10"></path>
        </svg>
      </a>
    </div>
  </section>
</template> 17L17 7"/>
<path d="M7 7h10v10"/>


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

.experience-item {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
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
  margin-bottom: 0.8rem;
}

.experience-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.experience-company {
  color: var(--primary-color);
  font-weight: 500;
}

.experience-period {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.experience-description {
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

.resume-section {
  margin-top: 3rem;
  padding-top: 2rem;
}

.resume-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  transition: all var(--transition-base);
  background: rgba(255, 215, 0, 0.05);
}

.resume-link:hover {
  background: var(--primary-color);
  color: var(--bg-primary);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

.resume-link svg {
  transition: transform var(--transition-base);
}

.resume-link:hover svg {
  transform: translate(2px, -2px);
}

@media (max-width: 768px) {
  .experience-item {
    padding: 1.2rem;
  }

  .experience-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .experience-period {
    font-size: 0.75rem;
  }

  .experience-title {
    font-size: 0.95rem;
  }

  .experience-description {
    font-size: 0.85rem;
  }

  .resume-link {
    font-size: 0.9rem;
    padding: 0.7rem 1.2rem;
  }
}
</style>