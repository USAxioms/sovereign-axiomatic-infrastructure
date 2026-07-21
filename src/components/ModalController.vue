<template>
  <div>
    <!-- Trigger -->
    <button class="open-modal-btn" @click="openModal">
      Open Modal
    </button>

    <!-- Modal Instance -->
    <Modal
      v-if="isOpen"
      :title="modalTitle"
      @close="closeModal"
    >
      <p>This is modal content coming from the parent component.</p>

      <template #footer>
        <button class="confirm-btn" @click="confirmAction">
          Confirm
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";

const isOpen = ref(false);
const modalTitle = ref("Example Modal");

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

function confirmAction() {
  console.log("Confirmed.");
  closeModal();
}
</script>

<style scoped>
.open-modal-btn {
  padding: 8px 14px;
  border-radius: 6px;
  background: var(--ink-mid);
  color: #fff;
  border: none;
  cursor: pointer;
}

.confirm-btn {
  padding: 6px 12px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
