<template>
  <div class="constraint-list">
    <div
      v-for="c in constraints"
      :key="c.id"
      class="constraint-item"
    >
      <div class="constraint-header">
        <strong>{{ c.id }}</strong>
        <span
          class="status"
          :class="c.satisfied ? 'ok' : 'fail'"
        >
          {{ c.satisfied ? "Satisfied" : "Unsatisfied" }}
        </span>
      </div>

      <div class="constraint-details">
        <p><strong>Weight:</strong> {{ c.weight }}</p>
      </div>

      <div class="constraint-actions">
        <slot name="actions" :constraint="c" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  constraints: Array<{
    id: string;
    satisfied: boolean;
    weight: number;
  }>;
}>();
</script>

<style scoped>
.constraint-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.constraint-item {
  padding: 12px;
  border: 1px solid var(--panel-border);
  border-radius: 6px;
  background: var(--panel-bg);
}

.constraint-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status.ok {
  background: #d4ffd4;
  color: #0a7a0a;
}

.status.fail {
  background: #ffd4d4;
  color: #a00;
}

.constraint-details {
  margin-top: 8px;
  opacity: 0.85;
}

.constraint-actions {
  margin-top: 10px;
}
</style>
