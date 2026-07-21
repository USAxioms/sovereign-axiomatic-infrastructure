<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <header class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="close">×</button>
      </header>

      <div class="modal-body">
        <slot />
      </div>

      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  background: var(--panel-bg);
  border-radius: 8px;
  width: 420px;
  max-width: 90%;
  padding: 20px;
  border: 1px solid var(--panel-border);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: var(--text);
}

.modal-body {
  margin-top: 15px;
}

.modal-footer {
  margin-top: 20px;
  text-align: right;
}
</style>
