<template>
  <div class="skeleton" :style="styleObject"></div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '16px'
  },
  radius: {
    type: String,
    default: '4px'
  }
})

const styleObject = computed(() => ({
  width: props.width,
  height: props.height,
  borderRadius: props.radius
}))
</script>

<style scoped>
.skeleton {
  background: linear-gradient(90deg, #e0e0e0, #f5f5f5, #e0e0e0);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
