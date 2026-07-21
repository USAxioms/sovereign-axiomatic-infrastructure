<template>
  <form class="form-builder" @submit.prevent="submit">

    <div
      v-for="(field, index) in schema"
      :key="index"
      class="form-field"
    >
      <label>{{ field.label }}</label>

      <input
        v-if="field.type === 'text'"
        v-model="model[field.key]"
        type="text"
      />

      <input
        v-if="field.type === 'number'"
        v-model.number="model[field.key]"
        type="number"
      />

      <select
        v-if="field.type === 'select'"
        v-model="model[field.key]"
      >
        <option
          v-for="opt in field.options"
          :key="opt"
          :value="opt"
        >
          {{ opt }}
        </option>
      </select>

      <textarea
        v-if="field.type === 'textarea'"
        v-model="model[field.key]"
      ></textarea>
    </div>

    <button type="submit" class="form-submit">
      Submit
    </button>

  </form>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

const props = defineProps({
  schema: {
    type: Array,
    required: true
  }
})

const model = reactive({})

function submit() {
  console.log('Form submitted:', model)
}
</script>

<style scoped>
.form-builder {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-submit {
  padding: 0.75rem;
  background: #3a7bd5;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
