<template>
  <div class="loader" v-if="active">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 4px solid #ccc;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
