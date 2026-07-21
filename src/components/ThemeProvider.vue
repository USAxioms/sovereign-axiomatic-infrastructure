<template>
  <div class="theme-provider">
    <slot />
  </div>
</template>

<script setup>
import { Theme } from '@/theme/theme.js'
import { watchEffect } from 'vue'

watchEffect(() => {
  const root = document.documentElement
  const palette = Theme.colors[Theme.mode]

  root.style.setProperty('--bg', palette.background)
  root.style.setProperty('--surface', palette.surface)
  root.style.setProperty('--text', palette.text)
  root.style.setProperty('--primary', palette.primary)
  root.style.setProperty('--border', palette.border)

  root.style.setProperty('--font', Theme.typography.fontFamily)
  root.style.setProperty('--size', Theme.typography.baseSize)
  root.style.setProperty('--line', Theme.typography.lineHeight)

  root.style.setProperty('--xs', Theme.spacing.xs)
  root.style.setProperty('--sm', Theme.spacing.sm)
  root.style.setProperty('--md', Theme.spacing.md)
  root.style.setProperty('--lg', Theme.spacing.lg)
  root.style.setProperty('--xl', Theme.spacing.xl)

  root.style.setProperty('--r-sm', Theme.radius.sm)
  root.style.setProperty('--r-md', Theme.radius.md)
  root.style.setProperty('--r-lg', Theme.radius.lg)

  root.style.setProperty('--shadow-sm', Theme.shadow.sm)
  root.style.setProperty('--shadow-md', Theme.shadow.md)
  root.style.setProperty('--shadow-lg', Theme.shadow.lg)
})
</script>

<style>
.theme-provider {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
}
</style>
