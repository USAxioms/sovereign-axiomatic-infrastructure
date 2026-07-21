<template>
  <div class="error-message">
    <p class="error-text">{{ message }}</p>

    <Button
      v-if="retry"
      variant="secondary"
      @click="retry"
    >
      Retry
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from "./Button.vue";

defineProps<{
  message: string;
  retry?: () => void;
}>();
</script>

<style scoped>
.error-message {
  background: var(--error-bg);
  border-left: 4px solid var(--error-border);
  padding: 12px;
  border-radius: 4px;
  margin-top: 20px;
}

.error-text {
  font-size: 0.95rem;
  margin-bottom: 10px;
}
</style>
