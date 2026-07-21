<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  span: { type: Number, default: 12 },
  md: { type: Number, default: null },
  sm: { type: Number, default: null }
})

const classes = computed(() => {
  const base = `col-${props.span}`
  const md = props.md ? `col-md-${props.md}` : ''
  const sm = props.sm ? `col-sm-${props.sm}` : ''
  return `${base} ${md} ${sm}`
})
</script>
