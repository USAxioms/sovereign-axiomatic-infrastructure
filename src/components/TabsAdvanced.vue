<template>
  <div class="tabs-advanced">
    <div class="tab-list">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab"
        :class="{ active: index === modelValue }"
        @click="$emit('update:modelValue', index)"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="tab-content">
      <slot :active="modelValue" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  tabs: {
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
.tabs-advanced {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.tab-list {
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #eee;
}

.tab {
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: 600;
  color: #666;
}

.tab.active {
  color: #3a7bd5;
  border-bottom: 3px solid #3a7bd5;
}

.tab-content {
  padding: 1rem 0;
}
</style>
