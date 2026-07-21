<template>
  <div class="pagination">
    <button
      :disabled="page === 1"
      @click="$emit('update:page', page - 1)"
    >
      Prev
    </button>

    <span class="page-info">
      Page {{ page }} of {{ totalPages }}
    </span>

    <button
      :disabled="page === totalPages"
      @click="$emit('update:page', page + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  page: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.page-info {
  font-weight: 600;
}
</style>
