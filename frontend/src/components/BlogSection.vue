<template>
  <section
    id="blog"
    class="content-section blog-section"
    :class="{ active: activeSection === 'blog' }"
  >
    <div class="section-head">
      <div>
        <p class="section-kicker">LOGBOOK / STATIC ARCHIVE</p>
        <h3 class="section-title">{{ t.blog.title }}</h3>
      </div>
      <span class="signal-count">{{ filteredEntries.length }} signals</span>
    </div>

    <p class="section-intro">{{ t.blog.intro }}</p>

    <div class="filter-row" aria-label="Blog filters">
      <button
        v-for="filter in t.blog.filters"
        :key="filter.id"
        class="filter-button"
        :class="{ active: activeFilter === filter.id }"
        type="button"
        @click="selectFilter(filter.id)"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="blog-console">
      <div class="entry-list">
        <button
          v-for="entry in filteredEntries"
          :key="entry.id"
          class="entry-button"
          :class="{ active: selectedEntry.id === entry.id }"
          type="button"
          @click="selectedId = entry.id"
        >
          <span class="entry-date">{{ entry.date }}</span>
          <span class="entry-title">{{ entry.title }}</span>
        </button>
      </div>

      <article class="entry-preview">
        <span class="entry-signal">{{ selectedEntry.signal }}</span>
        <h4>{{ selectedEntry.title }}</h4>
        <p>{{ selectedEntry.summary }}</p>
        <div class="entry-meta">
          <span>{{ selectedEntry.date }}</span>
          <span>{{ selectedEntry.category }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)

const activeFilter = ref('all')
const selectedId = ref(t.value.blog.entries[0]?.id)

const filteredEntries = computed(() => {
  if (activeFilter.value === 'all') return t.value.blog.entries
  return t.value.blog.entries.filter((entry) => entry.category === activeFilter.value)
})

const selectedEntry = computed(() => (
  filteredEntries.value.find((entry) => entry.id === selectedId.value) || filteredEntries.value[0]
))

const selectFilter = (filterId) => {
  activeFilter.value = filterId
  selectedId.value = filteredEntries.value[0]?.id
}

watch(t, () => {
  activeFilter.value = 'all'
  selectedId.value = t.value.blog.entries[0]?.id
})
</script>

<style scoped>
.content-section {
  margin-bottom: 5rem;
  opacity: 0.74;
  transition: opacity var(--transition-base);
}

.content-section.active {
  opacity: 1;
}

.blog-section {
  border: 1px solid var(--border-color);
  border-radius: 0.35rem;
  background: var(--surface-panel);
  padding: 1.2rem;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.section-kicker,
.signal-count,
.entry-date,
.entry-signal,
.entry-meta {
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-kicker {
  color: var(--accent-cool);
  font-size: 0.68rem;
  margin-bottom: 0.35rem;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.4rem;
}

.signal-count {
  flex: 0 0 auto;
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  padding: 0.3rem 0.55rem;
  font-size: 0.64rem;
}

.section-intro {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.65;
  margin-bottom: 1rem;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-button {
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  padding: 0.4rem 0.65rem;
  text-transform: uppercase;
  transition: all var(--transition-base);
}

.filter-button:hover,
.filter-button.active {
  background: var(--accent-warm);
  border-color: var(--accent-warm);
  color: #111318;
}

.blog-console {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: 0.9rem;
}

.entry-list {
  display: grid;
  gap: 0.55rem;
}

.entry-button {
  display: grid;
  gap: 0.25rem;
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 0.45rem;
  background: rgba(255, 255, 255, 0.025);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.8rem;
  text-align: left;
  transition: all var(--transition-base);
}

.entry-button:hover,
.entry-button.active {
  border-color: rgba(233, 236, 239, 0.44);
  background: rgba(233, 236, 239, 0.08);
  transform: translateX(3px);
}

.entry-date {
  color: var(--accent-cool);
  font-size: 0.62rem;
}

.entry-title {
  color: var(--text-primary);
  font-size: 0.86rem;
  line-height: 1.45;
}

.entry-preview {
  position: relative;
  min-height: 15rem;
  border: 1px solid rgba(233, 236, 239, 0.24);
  border-radius: 0.45rem;
  background:
    linear-gradient(135deg, rgba(213, 161, 77, 0.12), transparent 36%),
    rgba(0, 0, 0, 0.18);
  padding: 1rem;
  overflow: hidden;
}

.entry-preview::after {
  content: '';
  position: absolute;
  right: -3rem;
  bottom: -3rem;
  width: 9rem;
  height: 9rem;
  border: 1px solid rgba(233, 236, 239, 0.16);
  border-radius: 50%;
}

.entry-signal {
  color: var(--accent-warm);
  display: inline-block;
  font-size: 0.65rem;
  margin-bottom: 1rem;
}

.entry-preview h4 {
  color: var(--text-primary);
  font-size: 1.05rem;
  line-height: 1.35;
  margin-bottom: 0.75rem;
}

.entry-preview p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.7;
}

.entry-meta {
  display: flex;
  gap: 0.65rem;
  margin-top: 1.4rem;
  color: var(--text-muted);
  font-size: 0.62rem;
}

@media (max-width: 720px) {
  .blog-console {
    grid-template-columns: 1fr;
  }
}
</style>
