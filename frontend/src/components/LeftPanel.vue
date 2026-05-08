<template>
  <div class="left-panel">
    <IntroSection />
    <MissionStatus />
    <CommandDeck />
    <ScrollspyNav />
    <SocialLinks />
  </div>
</template>

<script setup>
import IntroSection from './IntroSection.vue'
import MissionStatus from './MissionStatus.vue'
import CommandDeck from './CommandDeck.vue'
import ScrollspyNav from './ScrollspyNav.vue'
import SocialLinks from './SocialLinks.vue'
</script>

<style scoped>
.left-panel {
  position: fixed;
  left: 0;
  top: 0;
  width: 38%;
  height: 100vh;
  padding: 2.6rem 3rem 2.4rem 7%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: var(--z-fixed);
  background:
    linear-gradient(180deg, rgba(8, 10, 13, 0.94), rgba(17, 22, 29, 0.88)),
    var(--bg-primary);
  backdrop-filter: blur(18px);
  border-right: 1px solid var(--border-color);
  overflow: hidden;
}

.left-panel::before {
  content: '';
  position: absolute;
  right: -10rem;
  bottom: 3rem;
  width: 26rem;
  height: 26rem;
  border: 1px solid rgba(235, 232, 222, 0.16);
  border-radius: 50%;
  transform: rotate(-18deg);
  box-shadow:
    0 0 0 4.8rem rgba(235, 232, 222, 0.012),
    0 0 0 9rem rgba(120, 166, 200, 0.012),
    inset 0 0 42px rgba(120, 166, 200, 0.06);
  pointer-events: none;
}

.left-panel::after {
  content: '';
  position: absolute;
  right: 4.8rem;
  bottom: 14.8rem;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--accent-red);
  box-shadow:
    0 0 18px rgba(214, 66, 50, 0.5),
    -7rem 5.2rem 0 -0.08rem var(--accent-warm),
    -11rem -1.2rem 0 -0.16rem var(--accent-cool);
  pointer-events: none;
}

.left-panel > :deep(*) {
  position: relative;
  z-index: 1;
}

@media (max-width: 1024px) {
  .left-panel {
    position: relative;
    width: 100%;
    height: auto;
    padding: 2rem;
    background: rgba(8, 10, 13, 0.94);
    backdrop-filter: blur(10px);
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }

  .left-panel::before {
    right: -10rem;
    bottom: -8rem;
  }

  .left-panel::after {
    right: 2rem;
    bottom: 4rem;
  }
}
</style>
