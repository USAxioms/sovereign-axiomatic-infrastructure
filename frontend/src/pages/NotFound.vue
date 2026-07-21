<template>
  <div class="notfound-container">
    <Card title="404 - Page Not Found">
      <p>The page you are looking for does not exist.</p>

      <Button variant="primary" @click="goHome">
        Go Back Home
      </Button>
    </Card>
  </div>
</template>

<script setup>
import Card from '../components/Card.vue'
import Button from '../components/Button.vue'

function goHome() {
  window.location.href = '/'
}
</script>

<style scoped>
.notfound-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f4f6;
}
</style>
