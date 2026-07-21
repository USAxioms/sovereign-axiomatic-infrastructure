<template>
  <div class="layout">
    <Navbar>
      <template #left>
        <slot name="nav-left" />
      </template>

      <template #center>
        <slot name="nav-center" />
      </template>

      <template #right>
        <slot name="nav-right" />
      </template>
    </Navbar>

    <div class="layout-body">
      <Sidebar v-if="showSidebar" :title="sidebarTitle">
        <slot name="sidebar" />
      </Sidebar>

      <main class="layout-content">
        <slot />
      </main>
    </div>

    <Footer :text="footerText" />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'
import { defineProps } from 'vue'

defineProps({
  showSidebar: {
    type: Boolean,
    default: true
  },
  sidebarTitle: {
    type: String,
    default: 'Menu'
  },
  footerText: {
    type: String,
    default: '© 2026 ADVANCEER Infrastructure'
  }
})
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.layout-body {
  display: flex;
  flex: 1;
}

.layout-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}
</style>
