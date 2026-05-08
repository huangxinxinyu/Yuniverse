<template>
  <section
    id="moments"
    class="content-section"
    :class="{ active: activeSection === 'moments' }"
  >
    <h3 class="section-title">{{ t.moments.title }}</h3>
    <p class="section-intro">{{ t.moments.intro }}</p>
    <div class="moments-console">
      <div class="moments-list">
        <button
          v-for="item in t.moments.items"
          :key="item"
          class="moment-pill"
          :class="{ active: selectedMoment === item }"
          type="button"
          @click="selectedMoment = item"
        >
          {{ item }}
        </button>
      </div>
      <aside class="moment-preview">
        <span>Queued transmission</span>
        <strong>{{ selectedMoment }}</strong>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)
const selectedMoment = ref(t.value.moments.items[0])

watch(t, () => {
  selectedMoment.value = t.value.moments.items[0]
})
</script>

<style scoped>
.content-section {
  margin-bottom: 5rem;
  opacity: 0.72;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.4rem;
  margin-bottom: 0.6rem;
}

.section-intro {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.65;
  margin-bottom: 1.2rem;
}

.moments-console {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(12rem, 0.45fr);
  gap: 1rem;
}

.moments-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-content: flex-start;
}

.moment-pill {
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-primary);
  background: rgba(235, 232, 222, 0.04);
  padding: 0.45rem 0.85rem;
  font-size: 0.84rem;
  cursor: pointer;
  transition: all var(--transition-base);
}

.moment-pill:hover,
.moment-pill.active {
  border-color: var(--accent-red);
  background: rgba(214, 66, 50, 0.16);
}

.moment-preview {
  border: 1px solid var(--border-color);
  border-radius: 0.35rem;
  background: rgba(0, 0, 0, 0.16);
  padding: 1rem;
}

.moment-preview span {
  display: block;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.moment-preview strong {
  color: var(--text-primary);
  font-size: 1rem;
}

@media (max-width: 680px) {
  .moments-console {
    grid-template-columns: 1fr;
  }
}
</style>
