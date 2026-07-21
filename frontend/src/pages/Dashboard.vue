<template>
  <Layout :showSidebar="true" sidebarTitle="Dashboard">
    <template #nav-left>
      <strong>ADVANCEER</strong>
    </template>

    <template #sidebar>
      <ul class="menu">
        <li><a href="/">Overview</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </template>

    <Card title="System Overview">
      <div class="stats-grid">
        <div class="stat-box">
          <h4>Users</h4>
          <p>{{ users }}</p>
        </div>

        <div class="stat-box">
          <h4>Active Sessions</h4>
          <p>{{ sessions }}</p>
        </div>

        <div class="stat-box">
          <h4>Errors (24h)</h4>
          <p>{{ errors }}</p>
        </div>
      </div>
    </Card>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '../layouts/Layout.vue'
import Card from '../components/Card.vue'

const users = ref(128)
const sessions = ref(42)
const errors = ref(3)
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.stat-box {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.stat-box h4 {
  margin-bottom: 0.25rem;
  font-weight: 600;
}
</style>
