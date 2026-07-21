<template>
  <transition
    :enter-active-class="config.enterActiveClass"
    :leave-active-class="config.leaveActiveClass"
    :enter-from-class="config.enterFromClass"
    :leave-to-class="config.leaveToClass"
  >
    <slot />
  </transition>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  config: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
