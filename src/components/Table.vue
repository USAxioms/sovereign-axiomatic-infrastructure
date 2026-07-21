<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(cell, i) in row" :key="i">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
}
th, td {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
thead th {
  background: #f5f5f5;
  font-weight: 600;
}
</style>
