<template>
  <div class="tooltip-wrapper" @mouseenter="show = true" @mouseleave="show = false">
    <slot />

    <div v-show="show" class="tooltip" :class="position">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

defineProps({
  text: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'top' // top, bottom, left, right
  }
})

const show = ref(false)
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  background: #333;
  color: #fff;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  z-index: 10;
  opacity: 0.9;
}

.top {
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
}

.bottom {
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
}

.left {
  right: 120%;
  top: 50%;
  transform: translateY(-50%);
}

.right {
  left: 120%;
  top: 50%;
  transform: translateY(-50%);
}
</style>q
