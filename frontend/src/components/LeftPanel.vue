<template>
  <div class="left-panel">
    <IntroSection />
    <ScrollspyNav />
    <SocialLinks />
  </div>
</template>

<script setup>
import IntroSection from './IntroSection.vue'
import ScrollspyNav from './ScrollspyNav.vue'
import SocialLinks from './SocialLinks.vue'
</script>

<style scoped>
.left-panel {
  position: fixed;
  left: 0;
  top: 0;
  width: 40%;
  height: 100vh;
  padding: 3rem 3rem 3rem 8%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: var(--z-fixed);
  background: rgba(10, 10, 26, 0.8);
  backdrop-filter: blur(10px);
  border-right: 1px solid var(--border-color);
}

@media (max-width: 1024px) {
  .left-panel {
    position: relative;
    width: 100%;
    height: auto;
    padding: 2rem;
    background: rgba(10, 10, 26, 0.9);
    backdrop-filter: blur(5px);
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
}
</style>