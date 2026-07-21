<template>
  <div class="flag-list">
    <div
      v-for="flag in flags"
      :key="flag"
      class="flag-item"
    >
      <div class="flag-header">
        <strong>{{ flag }}</strong>
      </div>

      <div class="flag-actions">
        <slot name="actions" :flag="flag" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  flags: string[];
}>();
</script>

<style scoped>
.flag-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.flag-item {
  padding: 12px;
  border: 1px solid var(--panel-border);
  border-radius: 6px;
  background: var(--panel-bg);
}

.flag-header {
  font-size: 1rem;
  font-weight: 600;
}

.flag-actions {
  margin-top: 8px;
}
</style>
