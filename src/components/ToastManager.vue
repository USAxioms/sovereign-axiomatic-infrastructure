<template>
  <div class="toast-container">
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      class="toast"
      :class="toast.type"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 9999;
}

.toast {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

.info { background: #3a7bd5; }
.success { background: #28a745; }
.warning { background: #ffc107; color: #333; }
.error { background: #dc3545; }
</style>
