<template>
  <div class="login-container">
    <Card title="Login">
      <form class="form" @submit.prevent="login">
        <label>
          Email
          <input type="email" v-model="email" required />
        </label>

        <label>
          Password
          <input type="password" v-model="password" required />
        </label>

        <Button variant="primary" type="submit">Sign In</Button>
      </form>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '../../components/Card.vue'
import Button from '../../components/Button.vue'

const email = ref('')
const password = ref('')

function login() {
  console.log('Attempt login:', { email: email.value, password: password.value })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f4f6;
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
