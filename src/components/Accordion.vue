<template>
  <div class="accordion">
    <div
      v-for="(item, index) in items"
      :key="item.label"
      class="accordion-item"
    >
      <button
        class="accordion-header"
        @click="toggle(index)"
      >
        {{ item.label }}
      </button>

      <div
        class="accordion-body"
        v-show="openIndex === index"
      >
        <slot :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.accordion {
  width: 100%;
}
.accordion-item {
  border-bottom: 1px solid #ddd;
}
.accordion-header {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
.accordion-body {
  padding: 1rem;
  background: #fff;
}
</style>
