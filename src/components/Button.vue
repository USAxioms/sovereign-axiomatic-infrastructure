<template>
  <button
    class="btn"
    :class="variant"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  variant: {
    type: String,
    default: 'primary' // primary, secondary, danger, etc.
  }
})
</script>

<style scoped>
.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
  color: #fff;
}

.primary {
  background: #007bff;
}
.primary:hover {
  background: #0069d9;
}

.secondary {
  background: #6c757d;
}
.secondary:hover {
  background: #5a6268;
}

.danger {
  background: #dc3545;
}
.danger:hover {
  background: #c82333;
}
</style>
