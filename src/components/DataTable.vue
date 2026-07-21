<template>
  <div class="data-table">

    <!-- Search -->
    <input
      v-model="search"
      class="dt-search"
      placeholder="Search..."
    />

    <!-- Table -->
    <table>
      <thead>
        <tr>
          <th
            v-for="(col, index) in columns"
            :key="index"
            @click="sort(col.key)"
            class="dt-header"
          >
            {{ col.label }}
            <span v-if="sortKey === col.key">
              {{ sortDir === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in paginated" :key="index">
          <td v-for="col in columns" :key="col.key">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="dt-pagination">
      <button @click="prev" :disabled="page === 1">Prev</button>
      <span>Page {{ page }}</span>
      <button @click="next" :disabled="page >= maxPage">Next</button>
    </div>

  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'

const props = defineProps({
  columns: Array,
  rows: Array,
  perPage: {
    type: Number,
    default: 10
  }
})

const search = ref('')
const sortKey = ref(null)
const sortDir = ref('asc')
const page = ref(1)

const filtered = computed(() => {
  return props.rows.filter(row =>
    JSON.stringify(row).toLowerCase().includes(search.value.toLowerCase())
  )
})

function sort(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

const sorted = computed(() => {
  if (!sortKey.value) return filtered.value
  return [...filtered.value].sort((a, b) => {
    const valA = a[sortKey.value]
    const valB = b[sortKey.value]
    if (valA < valB) return sortDir.value === 'asc' ? -1 : 1
    if (valA > valB) return sortDir.value === 'asc' ? 1 : -1
    return 0
  })
})

const maxPage = computed(() =>
  Math.ceil(sorted.value.length / props.perPage)
)

const paginated = computed(() => {
  const start = (page.value - 1) * props.perPage
  return sorted.value.slice(start, start + props.perPage)
})

function next() {
  if (page.value < maxPage.value) page.value++
}

function prev() {
  if (page.value > 1) page.value--
}
</script>

<style scoped>
.data-table {
  width: 100%;
}

.dt-search {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

.dt-header {
  cursor: pointer;
  padding: 0.75rem;
  background: #f7f7f7;
  border-bottom: 2px solid #eee;
}

td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}

.dt-pagination {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
