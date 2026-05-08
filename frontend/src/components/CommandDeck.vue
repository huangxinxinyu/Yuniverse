<template>
  <aside class="command-deck" aria-label="Exploration command deck">
    <div class="deck-header">
      <span>Command Deck</span>
      <strong>{{ activeLabel }}</strong>
    </div>

    <div class="resource-row" aria-label="Archive resources">
      <div>
        <span>Logs</span>
        <strong>{{ t.blog.entries.length }}</strong>
      </div>
      <div>
        <span>Builds</span>
        <strong>{{ t.projects.items.length }}</strong>
      </div>
      <div>
        <span>Ops</span>
        <strong>{{ t.experience.items.length }}</strong>
      </div>
    </div>

    <div class="sector-map" aria-label="Section minimap">
      <button
        v-for="(page, index) in t.sitePages"
        :key="page.path"
        class="sector-dot"
        :class="{ active: route.path === page.path }"
        :style="dotStyle(index)"
        type="button"
        :aria-label="`Open ${page.title}`"
        @click="jump(page.path)"
      >
        <span>{{ index + 1 }}</span>
      </button>
      <div class="scan-line" aria-hidden="true"></div>
    </div>

    <div class="command-grid">
      <button
        v-for="command in commands"
        :key="command.path"
        type="button"
        :class="{ active: route.path === command.path }"
        @click="jump(command.path)"
      >
        <span>{{ command.key }}</span>
        {{ command.label }}
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolio'
import { useRoute, useRouter } from 'vue-router'

const store = usePortfolioStore()
const { t } = storeToRefs(store)
const route = useRoute()
const router = useRouter()

const activeLabel = computed(() => t.value.sitePages.find((page) => page.path === route.path)?.title || t.value.sitePages[0].title)
const commands = computed(() => t.value.sitePages.map((page, index) => ({
  key: `F${index + 1}`,
  path: page.path,
  label: page.title
})))

const jump = (path) => {
  router.push(path)
}

const dotStyle = (index) => {
  const angle = (index / t.value.sitePages.length) * Math.PI * 2 - Math.PI / 2
  const radius = 41
  const x = 50 + Math.cos(angle) * radius
  const y = 50 + Math.sin(angle) * radius

  return {
    left: `${x}%`,
    top: `${y}%`
  }
}
</script>

<style scoped>
.command-deck {
  border: 1px solid var(--border-color);
  background:
    linear-gradient(135deg, rgba(120, 166, 200, 0.08), transparent 34%),
    rgba(0, 0, 0, 0.18);
  padding: 0.9rem;
  margin-bottom: 1.2rem;
  clip-path: polygon(0 0, calc(100% - 0.75rem) 0, 100% 0.75rem, 100% 100%, 0.75rem 100%, 0 calc(100% - 0.75rem));
}

.deck-header,
.resource-row,
.command-grid button {
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.deck-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--text-muted);
  font-size: 0.62rem;
  margin-bottom: 0.8rem;
}

.deck-header strong {
  color: var(--accent-cool);
}

.resource-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.45rem;
  margin-bottom: 0.85rem;
}

.resource-row div {
  border: 1px solid rgba(235, 232, 222, 0.12);
  background: rgba(235, 232, 222, 0.035);
  padding: 0.45rem;
}

.resource-row span {
  display: block;
  color: var(--text-muted);
  font-size: 0.54rem;
}

.resource-row strong {
  display: block;
  color: var(--text-primary);
  font-size: 0.95rem;
  margin-top: 0.1rem;
}

.sector-map {
  position: relative;
  width: 100%;
  aspect-ratio: 1.9 / 1;
  border: 1px solid rgba(120, 166, 200, 0.24);
  background:
    radial-gradient(circle at center, transparent 0 28%, rgba(120, 166, 200, 0.08) 29% 30%, transparent 31%),
    linear-gradient(90deg, rgba(235, 232, 222, 0.055) 1px, transparent 1px),
    linear-gradient(180deg, rgba(235, 232, 222, 0.045) 1px, transparent 1px);
  background-size: auto, 24px 24px, 24px 24px;
  overflow: hidden;
  margin-bottom: 0.8rem;
}

.sector-map::before {
  content: '';
  position: absolute;
  inset: 12%;
  border: 1px solid rgba(235, 232, 222, 0.13);
  border-radius: 50%;
}

.scan-line {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(120, 166, 200, 0.14), transparent);
  width: 34%;
  animation: scan 3.6s linear infinite;
}

.sector-dot {
  position: absolute;
  width: 1.35rem;
  height: 1.35rem;
  border: 1px solid rgba(235, 232, 222, 0.32);
  border-radius: 50%;
  background: rgba(8, 10, 13, 0.86);
  color: var(--text-muted);
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: all var(--transition-base);
  z-index: 1;
}

.sector-dot span {
  font-family: var(--font-mono);
  font-size: 0.56rem;
}

.sector-dot:hover,
.sector-dot.active {
  background: var(--accent-red);
  border-color: var(--accent-red);
  color: var(--text-primary);
  box-shadow: 0 0 18px rgba(214, 66, 50, 0.32);
}

.command-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.42rem;
}

.command-grid button {
  border: 1px solid rgba(235, 232, 222, 0.14);
  background: rgba(235, 232, 222, 0.035);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.58rem;
  min-height: 2.2rem;
  padding: 0.3rem;
  text-align: left;
  transition: all var(--transition-base);
}

.command-grid button span {
  display: block;
  color: var(--accent-warm);
  font-size: 0.5rem;
}

.command-grid button:hover,
.command-grid button.active {
  background: rgba(214, 66, 50, 0.16);
  border-color: var(--accent-red);
  color: var(--text-primary);
}

@keyframes scan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(330%);
  }
}

@media (max-width: 1024px) {
  .command-deck {
    max-width: 34rem;
    margin: 0 auto 1.2rem;
  }
}
</style>
