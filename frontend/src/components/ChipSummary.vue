<template>
  <div class="chip-summary">
    <div class="chip-header">
      <h3>{{ chipId }}</h3>

      <router-link :to="`/chip/${chipId}`" class="chip-link">
        View
      </router-link>
    </div>

    <div class="chip-stats">
      <p><strong>Satisfaction:</strong> {{ satisfaction }}</p>
      <p><strong>Compliant:</strong> {{ compliant ? "Yes" : "No" }}</p>
      <p><strong>Constraints:</strong> {{ constraints.length }}</p>
    </div>

    <div class="chip-actions">
      <slot name="actions" :chipId="chipId" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  chipId: string;
  satisfaction: number;
  compliant: boolean;
  constraints: Array<{
    id: string;
    satisfied: boolean;
    weight: number;
  }>;
}>();
</script>

<style scoped>
.chip-summary {
  padding: 15px;
  border: 1px solid var(--panel-border);
  border-radius: 6px;
  background: var(--panel-bg);
  margin-bottom: 20px;
}

.chip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chip-link {
  text-decoration: none;
  color: var(--accent);
  font-weight: 600;
}

.chip-stats {
  margin-top: 10px;
  opacity: 0.85;
}

.chip-actions {
  margin-top: 12px;
}
</style>
