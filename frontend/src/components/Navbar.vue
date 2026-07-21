<template>
  <nav class="navbar">
    <div class="navbar-left">
      <slot name="left" />
    </div>

    <div class="navbar-center">
      <slot name="center" />
    </div>

    <div class="navbar-right">
      <slot name="right" />
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1f2937;
  padding: 0.75rem 1rem;
  color: white;
}

.navbar-left,
.navbar-center,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
