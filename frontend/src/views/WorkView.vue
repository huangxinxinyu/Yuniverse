<template>
  <main class="page-view">
    <RouterLink to="/" class="back-link">Back to orbit</RouterLink>
    <section class="page-panel">
      <span>{{ page.key }}</span>
      <h1>{{ page.title }}</h1>
      <p>{{ page.description }}</p>
      <div class="placeholder-line"></div>
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
const page = computed(() => t.value.sitePages.find((item) => item.path === '/work'))
</script>
