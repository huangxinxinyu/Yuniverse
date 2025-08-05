<template>
  <div class="right-panel">
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
  </div>
</template>

<script setup>
import {onMounted, onUnmounted} from 'vue'
import {useScrollspy} from '@/composables/useScrollspy'
import AboutSection from './AboutSection.vue'
import ExperienceSection from './ExperienceSection.vue'
import ProjectsSection from './ProjectsSection.vue'

const {updateActiveSection} = useScrollspy()

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style scoped>
.right-panel {
  margin-left: 40%;
  width: 50%;
  padding: 6rem 8% 4rem 4rem;
  max-width: 800px;
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(8px);
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .right-panel {
    margin-left: 0;
    width: 100%;
    padding: 2rem;
    background: rgba(26, 26, 46, 0.7);
    backdrop-filter: blur(5px);
  }
}
</style>