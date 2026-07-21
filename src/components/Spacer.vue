<template>
  <div :style="computedStyle"></div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: '1rem' // e.g., "1rem", "20px", "2vh"
  }
})

const computedStyle = computed(() => ({
  height: props.size,
  width: '100%'
}))
</script>

<style scoped>
/* Spacer is purely functional — no static styles needed */
</style>
