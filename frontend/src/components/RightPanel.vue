<template>
  <div class="right-panel">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
.right-panel {
  margin-left: 38%;
  width: 62%;
  padding: 4.5rem 7% 4rem 3.5rem;
  max-width: 980px;
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
