<template>
  <footer class="footer">
    <p>{{ text }}</p>
  </footer>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  text: {
    type: String,
    default: '© 2026 ADVANCEER Infrastructure'
  }
})
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 1rem;
  background: #1f2937;
  color: #e5e7eb;
  text-align: center;
  font-size: 0.9rem;
}
</style>
