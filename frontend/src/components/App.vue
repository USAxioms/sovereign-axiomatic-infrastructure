<template>
  <div :class="['app', theme]">
    <!-- HEADER -->
    <header class="app-header">
      <h1>Sovereign Constitutional Engine</h1>

      <button @click="toggleTheme">
        Theme: {{ theme }}
      </button>
    </header>

    <!-- GLOBAL LOADING -->
    <div v-if="ui.loading" class="loading">
      Loading…
    </div>

    <!-- GLOBAL ERROR -->
    <div v-if="ui.error" class="error">
      {{ ui.error }}
    </div>

    <!-- MAIN CONTENT -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";

const uiStore = inject("uiStore");
const constitutionStore = inject("constitutionStore");

const theme = computed(() => uiStore.state.theme);

function toggleTheme() {
  uiStore.toggleTheme();
}
</script>

<style scoped>
.app {
  font-family: system-ui, sans-serif;
  padding: 20px;
}

.app.light {
  background: #f5f5f5;
  color: #222;
}

.app.dark {
  background: #111;
  color: #eee;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading {
  margin: 20px 0;
  padding: 10px;
  background: #ffe58f;
  border-left: 4px solid #d4a017;
}

.error {
  margin: 20px 0;
  padding: 10px;
  background: #ffccc7;
  border-left: 4px solid #cf1322;
}
</style>
