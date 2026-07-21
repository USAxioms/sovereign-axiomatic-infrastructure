<template>
  <div v-if="open" class="palette-overlay" @click="close">
    <div class="palette" @click.stop>
      <input
        v-model="query"
        class="palette-input"
        placeholder="Type a command..."
      />

      <div class="palette-results">
        <div
          v-for="(cmd, index) in filtered"
          :key="index"
          class="palette-item"
          @click="execute(cmd)"
        >
          {{ cmd.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'

const props = defineProps({
  commands: {
    type: Array,
    required: true
  },
  open: {
    type: Boolean,
    default: false
  }
})

const query = ref('')

const filtered = computed(() =>
  props.commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.value.toLowerCase())
  )
)

function execute(cmd) {
  cmd.action()
}

function close() {
  query.value = ''
}
</script>

<style scoped>
.palette-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10vh;
}

.palette {
  width: 480px;
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.palette-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.palette-item {
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
}

.palette-item:hover {
  background: #f0f0f0;
}
</style>
