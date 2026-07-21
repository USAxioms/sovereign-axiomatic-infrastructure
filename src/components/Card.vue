<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup>
// Simple reusable card container.
// Wrap any content inside <Card> ... </Card>.
</script>

<style scoped>
.card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}
</style>
