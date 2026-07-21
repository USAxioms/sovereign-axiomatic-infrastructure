<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>{{ title }}</h2>
    </div>

    <nav class="sidebar-nav">
      <slot />
    </nav>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Menu'
  }
})
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: #111827;
  color: white;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  margin-bottom: 1.5rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
