<template>
  <div class="accordion-advanced">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="accordion-item"
    >
      <div
        class="accordion-header"
        @click="toggle(index)"
      >
        <span>{{ item.title }}</span>
        <span class="arrow" :class="{ open: openIndex === index }">▾</span>
      </div>

      <div
        class="accordion-body"
        v-show="openIndex === index"
      >
        <slot :content="item.content" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.accordion-item {
  border-bottom: 1px solid #eee;
  padding: 0.75rem 0;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 600;
  color: #444;
}

.arrow {
  transition: transform 0.2s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

.accordion-body {
  padding: 0.75rem 0;
  color: #555;
}
</style>
