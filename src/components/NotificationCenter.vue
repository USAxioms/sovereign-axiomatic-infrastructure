<template>
  <div class="notification-center">
    <h3 class="nc-title">Notifications</h3>

    <div v-if="notifications.length === 0" class="nc-empty">
      No notifications
    </div>

    <div
      v-for="(note, index) in notifications"
      :key="index"
      class="nc-item"
      :class="note.type"
    >
      <div class="nc-message">{{ note.message }}</div>
      <div class="nc-time">{{ note.time }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([])

function addNotification(message, type = 'info') {
  notifications.value.unshift({
    message,
    type,
    time: new Date().toLocaleTimeString()
  })
}

defineExpose({ addNotification })
</script>

<style scoped>
.notification-center {
  width: 320px;
  background: #fff;
  border-left: 1px solid #e0e0e0;
  height: 100vh;
  padding: 1rem;
  overflow-y: auto;
}

.nc-title {
  font-weight: 700;
  margin-bottom: 1rem;
}

.nc-empty {
  color: #777;
  font-size: 0.9rem;
}

.nc-item {
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  color: #fff;
}

.info { background: #3a7bd5; }
.success { background: #28a745; }
.warning { background: #ffc107; color: #333; }
.error { background: #dc3545; }

.nc-time {
  font-size: 0.75rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}
</style>
