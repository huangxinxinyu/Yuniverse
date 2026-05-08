<template>
  <div class="intro-section">
    <div class="mission-kicker">
      <span>{{ t.ui.missionLabel }}</span>
      <strong>{{ t.ui.flightStatus }}</strong>
    </div>
    <h1 class="name-title">{{ t.name }}</h1>
    <h2 class="job-title">
      <span v-for="line in titleLines" :key="line">{{ line }}</span>
    </h2>
    <p class="intro-description">{{ t.description }}</p>
    <div class="intro-actions">
      <a :href="t.resume.href" class="intro-action primary" target="_blank" rel="noopener noreferrer">
        {{ t.resume.label }}
      </a>
      <a :href="`mailto:${t.social.email}`" class="intro-action">
        {{ t.ui.contactAction }}
      </a>
    </div>
    <div class="signal-panel" aria-label="Current personal signal">
      <span>{{ t.ui.signalLabel }}</span>
      <p>{{ t.ui.signalValue }}</p>
    </div>
  </div>
</template>

<script setup>
import { usePortfolioStore } from '@/stores/portfolio'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = usePortfolioStore()
const { t } = storeToRefs(store)

const titleLines = computed(() => Array.isArray(t.value.title) ? t.value.title : [t.value.title])
</script>

<style scoped>
.intro-section {
  margin-top: 2.2rem;
  margin-bottom: 1.6rem;
  max-width: 520px;
}

.mission-kicker {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.35rem;
  width: fit-content;
  border-left: 3px solid var(--accent-red);
  padding-left: 0.85rem;
  margin-bottom: 1.6rem;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mission-kicker span {
  color: var(--text-primary);
  font-size: 0.72rem;
  font-weight: 700;
}

.mission-kicker strong {
  color: var(--text-muted);
  font-size: 0.62rem;
  font-weight: 600;
}

.name-title {
  font-family: var(--font-display);
  font-size: clamp(3.35rem, 7.5vw, 6.8rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 0.82;
  text-transform: uppercase;
}

.job-title {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  color: var(--secondary-color);
  margin-bottom: 1.3rem;
  line-height: 1.32;
  max-width: 28rem;
}

.intro-description {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
  line-height: 1.7;
  max-width: 30rem;
}

.intro-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.intro-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.55rem;
  border: 1px solid var(--border-color);
  border-radius: 0.15rem;
  color: var(--text-primary);
  background: rgba(235, 232, 222, 0.04);
  padding: 0.6rem 0.95rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.intro-action.primary {
  background: var(--accent-red);
  color: var(--text-primary);
  border-color: var(--accent-red);
}

.intro-action:hover {
  transform: translateY(-2px);
  text-shadow: none;
}

.signal-panel {
  position: relative;
  margin-top: 1.1rem;
  border: 1px solid var(--border-color);
  background:
    linear-gradient(90deg, rgba(214, 66, 50, 0.11), transparent),
    rgba(0, 0, 0, 0.16);
  padding: 0.85rem 0.95rem;
  max-width: 30rem;
}

.signal-panel::after {
  content: '';
  position: absolute;
  right: 0.7rem;
  top: 0.7rem;
  width: 0.48rem;
  height: 0.48rem;
  background: var(--accent-red);
}

.signal-panel span {
  display: block;
  color: var(--accent-cool);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
}

.signal-panel p {
  color: var(--text-primary);
  font-size: 0.86rem;
  line-height: 1.55;
}

@media (max-width: 1024px) {
  .intro-section {
    text-align: center;
    max-width: 100%;
    margin: 2rem auto;
  }

  .name-title {
    font-size: clamp(3rem, 16vw, 5rem);
    line-height: 0.9;
  }

  .job-title {
    font-size: 1rem;
    margin-left: auto;
    margin-right: auto;
  }

  .intro-description {
    font-size: 0.9rem;
  }

  .intro-actions {
    justify-content: center;
  }

  .mission-kicker,
  .signal-panel {
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }
}
</style>
