<template>
  <div class="right-panel">
    <IdentitySection />
    <JourneySection />
    <NavigationHubSection />
    <ExperienceSection />
    <ProjectsSection />
    <BlogSection />
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
import BlogSection from './BlogSection.vue'
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
    linear-gradient(180deg, rgba(17, 22, 29, 0.78), rgba(8, 10, 13, 0.58)),
    var(--surface-panel);
  backdrop-filter: blur(18px);
  min-height: 100vh;
  border-left: 1px solid rgba(235, 232, 222, 0.08);
}

@media (max-width: 1024px) {
  .right-panel {
    margin-left: 0;
    width: 100%;
    padding: 2rem;
    background: rgba(17, 22, 29, 0.82);
    backdrop-filter: blur(10px);
  }
}
</style>
