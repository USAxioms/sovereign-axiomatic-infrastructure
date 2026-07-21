<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>

    <input
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input-field"
      @input="onInput"
    />

    <div v-if="error" class="input-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.input-label {
  margin-bottom: 6px;
  font-weight: 600;
}

.input-field {
  padding: 8px;
  border: 1px solid var(--panel-border);
  border-radius: 4px;
  background: var(--panel-bg);
  color: var(--text);
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: var(--accent);
  outline: none;
}

.input-field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-error {
  margin-top: 6px;
  color: var(--error-border);
  font-size: 0.9rem;
}
</style>
