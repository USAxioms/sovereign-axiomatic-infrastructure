<template>
  <nav class="breadcrumbs">
    <span
      v-for="(item, index) in items"
      :key="index"
      class="crumb"
      @click="$emit('navigate', index)"
    >
      {{ item }}
      <span v-if="index < items.length - 1" class="separator">/</span>
    </span>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #555;
}

.crumb {
  cursor: pointer;
  padding: 0 0.25rem;
}

.separator {
  margin: 0 0.25rem;
  color: #aaa;
}
</style>
