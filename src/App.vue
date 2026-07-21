<template>
  <div id="app">
    <h1>Component Demo</h1>

    <!-- Using the controller -->
    <ModalController />

    <!-- Using the node bridge -->
    <NodeBridge ref="bridge" />
  </div>
</template>

<script setup lang="ts">
import ModalController from "./components/ModalController.vue";
import NodeBridge from "./components/NodeBridge.vue";

// Example: sending a message to the NodeBridge
const bridge = ref();

function sendToBridge() {
  bridge.value.receive("Hello from App.vue");
}
</script>

<style>
#app {
  padding: 20px;
  font-family: sans-serif;
}
</style>
