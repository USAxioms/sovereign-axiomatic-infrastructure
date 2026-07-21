<template>
  <section class="section">
    <h2 class="section-title">{{ title }}</h2>

    <p v-if="description" class="section-description">
      {{ description }}
    </p>

    <div class="section-body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<style scoped>
.section {
  margin-top: 30px;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.section-description {
  margin-bottom: 15px;
  color: var(--text);
  opacity: 0.8;
}

.section-body {
  margin-top: 10px;
}
</style>
