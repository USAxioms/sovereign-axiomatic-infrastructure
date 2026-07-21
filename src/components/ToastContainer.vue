<template>
  <div class="toast-container">
    <Toast
      v-for="(toast, index) in toasts"
      :key="index"
      :message="toast.message"
      :type="toast.type"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Toast from './Toast.vue'

const toasts = ref([])

function addToast(message, type = 'info') {
  toasts.value.push({ message, type })

  setTimeout(() => {
    toasts.value.shift()
  }, 3000)
}

defineExpose({ addToast })
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}
</style>
