<template>
  <div class="right-panel">
    <IdentitySection />
    <JourneySection />
    <NavigationHubSection />
    <ExperienceSection />
    <ProjectsSection />
    <ShelfSection />
    <MomentsSection />
  </div>
</template>

<script setup>
import {onMounted, onUnmounted} from 'vue'
import {useScrollspy} from '@/composables/useScrollspy'
import IdentitySection from './IdentitySection.vue'
import JourneySection from './JourneySection.vue'
import NavigationHubSection from './NavigationHubSection.vue'
import ExperienceSection from './ExperienceSection.vue'
import ProjectsSection from './ProjectsSection.vue'
import ShelfSection from './ShelfSection.vue'
import MomentsSection from './MomentsSection.vue'

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
  background:
    linear-gradient(180deg, rgba(26, 26, 46, 0.74), rgba(10, 10, 26, 0.62)),
    rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(12px);
  min-height: 100vh;
  border-left: 1px solid rgba(255, 255, 255, 0.04);
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
