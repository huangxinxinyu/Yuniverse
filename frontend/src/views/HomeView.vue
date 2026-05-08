<template>
  <main class="home-view">
    <section class="orbit-stage" aria-label="Yuniverse entrance">
      <div class="center-mark">
        <span>personal archive</span>
        <h1>Yuniverse</h1>
        <p>{{ t.name }}</p>
      </div>

      <RouterLink
        v-for="(page, index) in orbitPages"
        :key="page.path"
        :to="page.path"
        class="archive-node"
        :style="nodeStyle(index)"
      >
        <span>{{ page.key }}</span>
        <strong>{{ page.title }}</strong>
        <small>{{ page.description }}</small>
      </RouterLink>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()
const { t } = storeToRefs(store)

const orbitPages = computed(() => t.value.sitePages.slice(1))

const nodeStyle = (index) => {
  const positions = [
    { '--x': '19%', '--y': '33%' },
    { '--x': '72%', '--y': '25%' },
    { '--x': '79%', '--y': '70%' },
    { '--x': '24%', '--y': '76%' }
  ]

  return positions[index] || positions[0]
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 6rem clamp(1rem, 5vw, 4rem) 3rem;
}

.orbit-stage {
  position: relative;
  width: min(82vw, 58rem);
  aspect-ratio: 1 / 0.68;
  min-height: 30rem;
}

.orbit-stage::before,
.orbit-stage::after {
  content: '';
  position: absolute;
  inset: 11% 8%;
  border: 1px solid rgba(216, 210, 196, 0.16);
  border-radius: 50%;
  transform: rotate(-11deg);
}

.orbit-stage::after {
  inset: 23% 21%;
  border-color: rgba(151, 167, 181, 0.12);
  transform: rotate(18deg);
}

.center-mark {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  text-align: center;
}

.center-mark span {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.center-mark h1 {
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(4rem, 11vw, 9rem);
  line-height: 0.86;
  margin: 0.45rem 0 0.25rem;
}

.center-mark p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.archive-node {
  position: absolute;
  left: var(--x);
  top: var(--y);
  z-index: 3;
  width: min(14rem, 38vw);
  color: var(--text-primary);
  text-decoration: none;
  transform: translate(-50%, -50%);
  transition: transform 0.45s ease, opacity 0.45s ease;
}

.archive-node::before {
  content: '';
  display: block;
  width: 0.55rem;
  height: 0.55rem;
  margin-bottom: 0.65rem;
  border-radius: 50%;
  background: var(--primary-color);
  box-shadow: 0 0 0 0.35rem rgba(216, 210, 196, 0.08);
}

.archive-node span {
  color: var(--text-muted);
  display: block;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.archive-node strong {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.5vw, 2rem);
  font-weight: 700;
  margin: 0.1rem 0;
}

.archive-node small {
  color: var(--text-secondary);
  display: block;
  font-size: 0.78rem;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(0.35rem);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.archive-node:hover {
  transform: translate(-50%, -50%) scale(1.06);
}

.archive-node:hover small {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 720px) {
  .orbit-stage {
    width: 100%;
    min-height: 40rem;
    aspect-ratio: auto;
  }

  .center-mark {
    top: 28%;
  }

  .archive-node {
    width: 12rem;
  }
}
</style>
