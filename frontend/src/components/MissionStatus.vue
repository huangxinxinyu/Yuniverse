<template>
  <aside class="mission-status" aria-label="Mission status">
    <div class="mission-row">
      <span>Current signal</span>
      <strong>{{ activeLabel }}</strong>
    </div>
    <div class="mission-track" aria-hidden="true">
      <span :style="{ width: `${progress}%` }"></span>
    </div>
    <div class="mission-row compact">
      <span>Archive depth</span>
      <strong>{{ activeIndex + 1 }}/{{ sectionIds.length }}</strong>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()
const { t, activeSection, sectionIds } = storeToRefs(store)

const activeIndex = computed(() => Math.max(0, sectionIds.value.indexOf(activeSection.value)))
const activeLabel = computed(() => t.value.nav[activeSection.value] || t.value.nav.identity)
const progress = computed(() => ((activeIndex.value + 1) / sectionIds.value.length) * 100)
</script>

<style scoped>
.mission-status {
  border: 1px solid var(--border-color);
  border-radius: 0.35rem;
  background: rgba(235, 232, 222, 0.035);
  padding: 0.9rem;
  margin: 0.75rem 0 1.25rem;
}

.mission-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mission-row strong {
  color: var(--text-primary);
  font-weight: 700;
}

.mission-row.compact {
  margin-top: 0.65rem;
}

.mission-track {
  height: 0.35rem;
  border: 1px solid rgba(235, 232, 222, 0.18);
  border-radius: 999px;
  margin-top: 0.65rem;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.26);
}

.mission-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent-red), var(--accent-cool));
  transition: width var(--transition-base);
}
</style>
