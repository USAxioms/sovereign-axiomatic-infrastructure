<template>
  <div class="search-filter">
    <input
      v-model="query"
      class="search-input"
      placeholder="Search..."
    />

    <div class="results">
      <div
        v-for="(item, index) in filtered"
        :key="index"
        class="result-item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const query = ref('')

const filtered = computed(() =>
  props.items.filter(item =>
    item.toLowerCase().includes(query.value.toLowerCase())
  )
)
</script>

<style scoped>
.search-filter {
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.result-item {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
</style>
