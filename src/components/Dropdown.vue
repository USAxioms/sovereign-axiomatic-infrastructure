<template>
  <div class="dropdown" @click="toggle">
    <div class="dropdown-label">
      {{ selectedLabel }}
    </div>

    <ul v-show="open" class="dropdown-menu">
      <li
        v-for="(item, index) in items"
        :key="index"
        @click.stop="select(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Object,
    default: null
  }
})

const open = ref(false)

function toggle() {
  open.value = !open.value
}

function select(item) {
  open.value = false
  emit('update:modelValue', item)
}

const emit = defineEmits(['update:modelValue'])

const selectedLabel = computed(() => {
  return props.modelValue?.label || 'Select...'
})
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 200px;
  cursor: pointer;
}

.dropdown-label {
  padding: 0.5rem 1rem;
  background: #eee;
  border-radius: 4px;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 0.5rem 1rem;
}

.dropdown-menu li:hover {
  background: #f5f5f5;
}
</style>
