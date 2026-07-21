<template>
  <div class="panel">
    <h3 v-if="title" class="panel-title">{{ title }}</h3>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<style scoped>
.panel {
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
}

.panel-title {
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

.panel-body {
  margin-top: 5px;
}
</style>
