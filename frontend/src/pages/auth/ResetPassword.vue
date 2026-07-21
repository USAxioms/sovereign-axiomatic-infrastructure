<template>
  <div class="reset-container">
    <Card title="Set New Password">
      <form class="form" @submit.prevent="updatePassword">
        <label>
          New Password
          <input type="password" v-model="password" required />
        </label>

        <label>
          Confirm Password
          <input type="password" v-model="confirm" required />
        </label>

        <Button variant="primary" type="submit">Update Password</Button>
      </form>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '../../components/Card.vue'
import Button from '../../components/Button.vue'

const password = ref('')
const confirm = ref('')

function updatePassword() {
  if (password.value !== confirm.value) {
    console.log('Passwords do not match')
    return
  }

  console.log('Password updated:', password.value)
}
</script>

<style scoped>
.reset-container {
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
