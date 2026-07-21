<template>
  <div class="node-bridge">
    <Modal
      v-if="show"
      :title="title"
      @close="close"
    >
      <p>{{ message }}</p>

      <template #footer>
        <button class="ok-btn" @click="acknowledge">
          OK
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Modal from "./Modal.vue";

const show = ref(false);
const title = ref("Node Message");
const message = ref("");

function receive(msg: string) {
  message.value = msg;
  show.value = true;
}

function close() {
  show.value = false;
}

function acknowledge() {
  console.log("Acknowledged:", message.value);
  close();
}

defineExpose({
  receive
});
</script>

<style scoped>
.ok-btn {
  padding: 6px 12px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
