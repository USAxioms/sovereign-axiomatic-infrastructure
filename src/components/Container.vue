<template>
  <div class="container">
    <slot />
  </div>
</template>

<script setup>
// Simple layout container.
// Wrap page content for consistent spacing and max-width.
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
