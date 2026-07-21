<template>
  <div class="forgot-container">
    <Card title="Reset Password">
      <form class="form" @submit.prevent="reset">
        <label>
          Email
          <input type="email" v-model="email" required />
        </label>

        <Button variant="primary" type="submit">Send Reset Link</Button>
      </form>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '../../components/Card.vue'
import Button from '../../components/Button.vue'

const email = ref('')

function reset() {
  console.log('Password reset requested for:', email.value)
}
</script>

<style scoped>
.forgot-container {
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
