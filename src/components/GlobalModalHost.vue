<template>
  <div v-if="stack.length" class="modal-overlay">
    <div class="modal-layer">
      <component
        v-for="(modal, index) in stack"
        :key="index"
        :is="modal.component"
        v-bind="modal.props"
      />
    </div>
  </div>
</template>

<script setup>
import { ModalEngine } from '@/engine/ModalEngine.js'
import { computed } from 'vue'

const stack = computed(() => ModalEngine.stack)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
}

.modal-layer {
  position: relative;
  z-index: 9999;
}
</style>
