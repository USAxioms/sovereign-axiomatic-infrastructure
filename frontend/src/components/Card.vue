<template>
  <div class="card">
    <header v-if="title" class="card-header">
      <h3>{{ title }}</h3>
    </header>

    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin-bottom: 1rem;
}

.card-header {
  margin-bottom: 0.8rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.card-body {
  font-size: 1rem;
  color: #111827;
}
</style>
