<template>
  <div class="progress-bar">
    <div class="progress-fill" :style="{ width: percent + '%' }"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  percent: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 12px;
  background: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3a7bd5;
  transition: width 0.3s ease;
}
</style>
