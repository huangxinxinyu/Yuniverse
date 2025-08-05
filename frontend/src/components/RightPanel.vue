<template>
  <div class="right-panel">
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useScrollspy } from '@/composables/useScrollspy'
import AboutSection from './AboutSection.vue'
import ExperienceSection from './ExperienceSection.vue'
import ProjectsSection from './ProjectsSection.vue'

const { updateActiveSection } = useScrollspy()

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
  margin-left: 45%;
  width: 55%;
  padding: 6rem 6rem 4rem 3rem;
  max-width: 800px;
}

@media (max-width: 1024px) {
  .right-panel {
    margin-left: 0;
    width: 100%;
    padding: 2rem;
  }
}
</style>