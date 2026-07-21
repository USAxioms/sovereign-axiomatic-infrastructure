<template>
  <div class="tabs">
    <div class="tab-headers">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.label"
        :class="{ active: index === modelValue }"
        @click="$emit('update:modelValue', index)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <slot :active="modelValue" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  tabs: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.tabs {
  width: 100%;
}
.tab-headers {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  background: #eee;
  cursor: pointer;
  border-radius: 4px;
}
button.active {
  background: #007bff;
  color: #fff;
}
.tab-content {
  padding: 1rem 0;
}
</style>
