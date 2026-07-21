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

    <Card title="Profile Settings">
      <form class="form">
        <label>
          Name
          <input type="text" v-model="name" />
        </label>

        <label>
          Email
          <input type="email" v-model="email" />
        </label>

        <Button variant="primary" @click="save">Save</Button>
      </form>
    </Card>
  </Layout>
</template>

<script setup>
import { ref } from 'vue'
import Layout from '../../layouts/Layout.vue'
import Card from '../../components/Card.vue'
import Button from '../../components/Button.vue'

const name = ref('ADVANCEER User')
const email = ref('user@example.com')

function save() {
  console.log('Saved:', { name: name.value, email: email.value })
}
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

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
}
</style>
