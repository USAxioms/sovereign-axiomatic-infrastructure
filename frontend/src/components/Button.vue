<template>
  <button
    :class="['btn', variant]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}>();

const emit = defineEmits(["click"]);

function handleClick(e: MouseEvent) {
  if (!props.disabled) emit("click", e);
}
</script>

<style scoped>
.btn {
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  margin-right: 10px;
  transition: background 0.2s, color 0.2s;
}

/* PRIMARY */
.btn.primary {
  background: var(--accent);
  color: white;
}
.btn.primary:hover {
  background: var(--accent-light);
  color: var(--text);
}

/* SECONDARY */
.btn.secondary {
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  color: var(--text);
}
.btn.secondary:hover {
  background: var(--accent-light);
}

/* DANGER */
.btn.danger {
  background: var(--error-border);
  color: white;
}
.btn.danger:hover {
  background: var(--error-bg);
  color: var(--text);
}

/* DISABLED */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
