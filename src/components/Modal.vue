<template>
  <div class="modal-backdrop" @click="close">
    <div class="modal" @click.stop>
      <slot />
      <button class="close-btn" @click="close">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
const close = () => emit('close')
</script>

<style>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  min-width: 300px;
}

.close-btn {
  margin-top: 1rem;
}
</style>
