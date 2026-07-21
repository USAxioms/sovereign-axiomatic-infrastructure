<template>
  <div class="toast" :class="type">
    {{ message }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info' // info, success, warning, error
  }
})
</script>

<style scoped>
.toast {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  color: #fff;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  animation: fadeIn 0.3s ease;
}

.info { background: #3a7bd5; }
.success { background: #28a745; }
.warning { background: #ffc107; color: #333; }
.error { background: #dc3545; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
