<template>
  <div class="grid" :style="computedStyle">
    <slot />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  columns: {
    type: Number,
    default: 2
  },
  gap: {
    type: String,
    default: '1rem'
  }
})

const computedStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
  gap: props.gap
}))
</script>

<style scoped>
.grid {
  width: 100%;
}
</style>
