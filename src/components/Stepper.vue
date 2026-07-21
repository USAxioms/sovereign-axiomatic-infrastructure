<template>
  <div class="stepper">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="step"
      :class="{ active: index === current, completed: index < current }"
      @click="$emit('update:current', index)"
    >
      <div class="circle">{{ index + 1 }}</div>
      <span class="label">{{ step }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  steps: {
    type: Array,
    required: true
  },
  current: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.stepper {
  display: flex;
  gap: 1.5rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ccc;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.active .circle {
  background: #3a7bd5;
}

.completed .circle {
  background: #28a745;
}

.label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
}
</style>
