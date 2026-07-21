<template>
  <div class="avatar" :style="sizeStyle">
    <img v-if="src" :src="src" alt="avatar" />
    <div v-else class="placeholder">
      {{ initials }}
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 40
  }
})

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map(n => n[0]?.toUpperCase())
    .join('')
})

const sizeStyle = computed(() => ({
  width: props.size + 'px',
  height: props.size + 'px'
}))
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  overflow: hidden;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #555;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  font-size: 0.8rem;
}
</style>
