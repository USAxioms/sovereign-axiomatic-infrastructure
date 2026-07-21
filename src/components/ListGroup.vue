<template>
  <div class="list-group">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="list-group-item"
      :class="{ active: index === modelValue }"
      @click="$emit('update:modelValue', index)"
    >
      {{ item }}
    </div>
  </div>
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
    default: null
  }
})
</script>

<style scoped>
.list-group {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.list-group-item {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  background: #fff;
  color: #444;
}

.list-group-item:last-child {
  border-bottom: none;
}

.list-group-item.active {
  background: #3a7bd5;
  color: #fff;
  font-weight: 600;
}
</style>
