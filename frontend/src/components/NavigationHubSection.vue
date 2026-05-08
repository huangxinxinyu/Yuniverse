<template>
  <section
    id="hub"
    class="content-section"
    :class="{ active: activeSection === 'hub' }"
  >
    <div class="hub-layout">
      <div>
        <p class="section-kicker">EXPLORE / SELECT DESTINATION</p>
        <h3 class="section-title">{{ t.hub.title }}</h3>
        <div class="hub-grid">
          <a
            v-for="item in t.hub.items"
            :key="item.label"
            class="hub-link"
            :class="{ active: activeItem.label === item.label }"
            :href="item.href || item.path"
            :target="item.href && item.href.startsWith('http') ? '_blank' : undefined"
            :rel="item.href && item.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            @mouseenter="hoveredLabel = item.label"
            @focus="hoveredLabel = item.label"
            @click="handleClick($event, item)"
          >
            <span>{{ item.label }}</span>
            <p>{{ item.description }}</p>
          </a>
        </div>
      </div>

      <aside class="hub-preview">
        <span class="preview-code">YUNI / {{ activeIndex + 1 }}</span>
        <h4>{{ activeItem.label }}</h4>
        <p>{{ activeItem.description }}</p>
        <div class="preview-orbit" aria-hidden="true">
          <span></span>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const store = usePortfolioStore()
const { t, activeSection } = storeToRefs(store)
const router = useRouter()
const hoveredLabel = ref('')

const activeItem = computed(() => (
  t.value.hub.items.find((item) => item.label === hoveredLabel.value) || t.value.hub.items[0]
))

const activeIndex = computed(() => Math.max(0, t.value.hub.items.findIndex((item) => item.label === activeItem.value.label)))

const handleClick = (event, item) => {
  if (!item.path) return
  event.preventDefault()
  router.push(item.path)
}
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
  margin-bottom: 1rem;
}

.section-kicker,
.preview-code {
  color: var(--accent-cool);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-kicker {
  margin-bottom: 0.35rem;
}

.hub-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(13rem, 0.48fr);
  gap: 1rem;
  align-items: stretch;
}

.hub-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.hub-link {
  display: block;
  min-height: 6rem;
  border: 1px solid var(--border-color);
  border-radius: 0.35rem;
  padding: 1rem;
  background:
    linear-gradient(135deg, rgba(235, 232, 222, 0.055), transparent),
    var(--surface-raised);
  text-decoration: none;
  transition: transform var(--transition-base), background var(--transition-base), border-color var(--transition-base);
}

.hub-link span {
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 700;
}

.hub-link p {
  color: var(--text-secondary);
  font-size: 0.82rem;
  line-height: 1.5;
  margin-top: 0.35rem;
}

.hub-link:hover {
  background: rgba(235, 232, 222, 0.08);
  border-color: rgba(235, 232, 222, 0.34);
  transform: translateY(-2px);
}

.hub-link.active {
  border-color: var(--accent-red);
}

.hub-preview {
  position: relative;
  min-height: 100%;
  border: 1px solid var(--border-color);
  border-radius: 0.35rem;
  background: rgba(0, 0, 0, 0.18);
  padding: 1rem;
  overflow: hidden;
}

.hub-preview h4 {
  color: var(--text-primary);
  font-size: 1.15rem;
  margin: 1.25rem 0 0.55rem;
}

.hub-preview p {
  color: var(--text-secondary);
  font-size: 0.86rem;
  line-height: 1.65;
  max-width: 18rem;
}

.preview-orbit {
  position: absolute;
  right: -4.25rem;
  bottom: -4.25rem;
  width: 10.5rem;
  height: 10.5rem;
  border: 1px solid rgba(235, 232, 222, 0.16);
  border-radius: 50%;
}

.preview-orbit span {
  position: absolute;
  top: 2rem;
  left: 1.2rem;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--accent-red);
}

@media (max-width: 760px) {
  .hub-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hub-grid {
    grid-template-columns: 1fr;
  }
}
</style>
