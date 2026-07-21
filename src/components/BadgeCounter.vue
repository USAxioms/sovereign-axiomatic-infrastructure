<template>
  <div class="badge-counter" :class="type">
    <slot />
    <span class="count">{{ count }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  count: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'default' // default, success, warning, error, info
  }
})
</script>

<style scoped>
.badge-counter {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.count {
  position: absolute;
  top: -6px;
  right: -10px;
  background: #dc3545;
  color: #fff;
  font-size: 0.7rem;
  padding: 0.15rem 0.35rem;
  border-radius: 50%;
  font-weight: 700;
}

.default .count { background: #6c757d; }
.success .count { background: #28a745; }
.warning .count { background: #ffc107; color: #333; }
.error .count { background: #dc3545; }
.info .count { background: #17a2b8; }
</style>a
