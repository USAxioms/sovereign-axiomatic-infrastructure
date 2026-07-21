<template>
  <div class="modal">
    <div class="modal-content">
      <slot />
      <button class="close-btn" @click="close">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ModalEngine } from '@/engine/ModalEngine.js'

function close() {
  ModalEngine.close()
}
</script>

<style scoped>
.modal {
  background: var(--surface);
  padding: var(--lg);
  border-radius: var(--r-md);
  box-shadow: var(--shadow-lg);
  min-width: 300px;
}
.close-btn {
  margin-top: var(--md);
  padding: var(--sm) var(--md);
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: var(--r-sm);
  cursor: pointer;
}
</style>
