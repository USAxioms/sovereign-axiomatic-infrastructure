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

    <Card title="Settings">
      <p>Adjust your preferences and system configuration here.</p>
    </Card>
  </Layout>
</template>

<script setup>
import Layout from '../layouts/Layout.vue'
import Card from '../components/Card.vue'
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
</style>
