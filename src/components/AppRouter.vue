<template>
  <component :is="activeView" />
</template>

<script setup>
import { computed } from 'vue'
import { Router } from '@/router/router.js'

const activeView = computed(() => Router.routes[Router.current])
</script>
