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
  width: 45%;
  height: 100vh;
  padding: 3rem 2rem 3rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: var(--z-fixed);
}

@media (max-width: 1024px) {
  .left-panel {
    position: relative;
    width: 100%;
    height: auto;
    padding: 2rem;
  }
}
</style>