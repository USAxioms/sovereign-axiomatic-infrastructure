<template>
  <div class="input-group">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  }
})
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
label {
  margin-bottom: 0.4rem;
  font-weight: 600;
}
.input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.input:focus {
  outline: none;
  border-color: #007bff;
}
</style>
