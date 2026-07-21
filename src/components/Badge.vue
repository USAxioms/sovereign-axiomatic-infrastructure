<template>
  <span class="badge" :class="type">
    <slot />
  </span>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'default' // default, success, warning, error, info
  }
})
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
}

.default {
  background: #6c757d;
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

.info {
  background: #17a2b8;
}
</style>
