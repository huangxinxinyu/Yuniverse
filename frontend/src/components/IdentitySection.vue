<template>
  <section
    id="identity"
    class="content-section identity-section"
    :class="{ active: activeSection === 'identity' }"
  >
    <div class="orbit-ring" aria-hidden="true"></div>
    <p class="section-eyebrow">{{ t.identity.eyebrow }}</p>
    <h3 class="section-title">{{ t.identity.title }}</h3>
    <p class="identity-lead">{{ t.identity.lead }}</p>

    <div class="identity-grid">
      <article v-for="card in t.identity.cards" :key="card.label" class="identity-card">
        <span class="identity-label">{{ card.label }}</span>
        <p>{{ card.value }}</p>
      </article>
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
  position: relative;
  margin-bottom: 5rem;
  opacity: 0.76;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.identity-section {
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-radius: 0.35rem;
  padding: 1.5rem;
  background:
    linear-gradient(135deg, rgba(214, 66, 50, 0.11), transparent 34%),
    linear-gradient(225deg, rgba(120, 166, 200, 0.11), transparent 46%),
    var(--surface-panel);
  box-shadow: var(--panel-shadow);
}

.orbit-ring {
  position: absolute;
  right: -7rem;
  top: -8rem;
  width: 17rem;
  height: 17rem;
  border: 1px solid rgba(235, 232, 222, 0.18);
  border-radius: 50%;
  box-shadow: inset 0 0 38px rgba(120, 166, 200, 0.08);
}

.orbit-ring::after {
  content: '';
  position: absolute;
  left: 2.6rem;
  bottom: 2rem;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--accent-red);
  box-shadow: 0 0 18px rgba(214, 66, 50, 0.42);
}

.section-eyebrow {
  color: var(--accent-cool);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.85rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.identity-lead {
  position: relative;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 1.5rem;
  max-width: 34rem;
}

.identity-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.identity-card {
  border: 1px solid var(--border-color);
  border-radius: 0.35rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  backdrop-filter: blur(8px);
}

.identity-label {
  display: block;
  color: var(--accent-warm);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.45rem;
}

.identity-card p {
  color: var(--text-primary);
  font-size: 0.9rem;
  line-height: 1.55;
}

@media (max-width: 768px) {
  .identity-section {
    padding: 1.15rem;
  }

  .identity-grid {
    grid-template-columns: 1fr;
  }
}
</style>
