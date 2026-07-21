<template>
  <Layout :showSidebar="true" sidebarTitle="Settings">
    <template #nav-left>
      <strong>ADVANCEER</strong>
    </template>

    <template #sidebar>
      <ul class="menu">
        <li><a href="/settings/profile">Profile</a></li>
        <li><a href="/settings/system">System</a></li>
      </ul>
    </template>

    <Card title="System Settings">
      <div class="system-grid">
        <div class="system-item">
          <h4>Version</h4>
          <p>{{ version }}</p>
        </div>

        <div class="system-item">
          <h4>Status</h4>
          <p>{{ status }}</p>
        </div>

        <div class="system-item">
          <h4>Environment</h4>
          <p>{{ environment }}</p>
        </div>
      </div>
    </Card>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '../../layouts/Layout.vue'
import Card from '../../components/Card.vue'

const version = ref('1.0.0')
const status = ref('Operational')
const environment = ref('Development')
</script>

<style scoped>
.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-bottom: 0.5rem;
}

.menu a {
  color: #e5e7eb;
  text-decoration: none;
}

.menu a:hover {
  text-decoration: underline;
}

.system-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.system-item h4 {
  margin-bottom: 0.25rem;
  font-weight: 600;
}
</style>
