<template>
  <nav class="nav-bar">
    <div class="nav-left">
      <slot name="brand" />
    </div>

    <div class="nav-items">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="nav-item"
        :class="{ active: index === modelValue }"
        @click="$emit('update:modelValue', index)"
      >
        {{ item }}
      </div>
    </div>

    <div class="nav-right">
      <slot name="actions" />
    </div>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.nav-items {
  display: flex;
  gap: 1.25rem;
}

.nav-item {
  cursor: pointer;
  font-weight: 600;
  color: #555;
}

.nav-item.active {
  color: #3a7bd5;
}
</style>
