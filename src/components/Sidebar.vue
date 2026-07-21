<template>
  <aside class="sidebar" :class="{ open }">
    <div class="header">
      <h2>{{ title }}</h2>
    </div>

    <ul class="menu">
      <li v-for="item in items" :key="item.label">
        <router-link :to="item.to">{{ item.label }}</router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: 'Menu'
  },
  items: {
    type: Array,
    default: () => []
  },
  open: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.sidebar {
  width: 240px;
  background: #1e1e1e;
  color: #fff;
  height: 100vh;
  padding: 1.5rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  transition: transform 0.3s ease;
}
.sidebar.open {
  transform: translateX(0);
}
.sidebar:not(.open) {
  transform: translateX(-100%);
}
.header {
  margin-bottom: 1.5rem;
}
.menu {
  list-style: none;
  padding: 0;
}
.menu li {
  margin-bottom: 1rem;
}
a {
  color: #fff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
