<template>
  <div class="alert" :class="type">
    <strong v-if="title">{{ title }}</strong>
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'info' // info, success, warning, error
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.alert {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: #fff;
}

.info {
  background: #3a7bd5;
}

.success {
  background: #28a745;
}

.warning {
  background: #ffc107;
  color: #333;
}

.error {
  background: #dc3545;
}
</style>
