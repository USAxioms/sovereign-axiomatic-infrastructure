<template>
  <div class="layout">
    <!-- HEADER -->
    <header class="layout-header">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link v-if="ui.activeChipId" :to="`/chip/${ui.activeChipId}`">
          Chip
        </router-link>
        <router-link to="/jurisdiction/global">
          Jurisdiction
        </router-link>
        <router-link to="/audit/0">
          Audit
        </router-link>
      </nav>

      <button @click="toggleTheme">
        Theme: {{ ui.theme }}
      </button>
    </header>

    <!-- MAIN CONTENT -->
    <main class="layout-main">
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer class="layout-footer">
      <p>Sovereign Constitutional Engine — ADVANCEER</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const uiStore = inject("uiStore");
const ui = uiStore.state;

function toggleTheme() {
  uiStore.toggleTheme();
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #222;
  color: #fff;
}

.layout-header nav a {
  margin-right: 15px;
  color: #fff;
  text-decoration: none;
}

.layout-header nav a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}

.layout-main {
  flex: 1;
  padding: 20px;
}

.layout-footer {
  padding: 10px;
  text-align: center;
  background: #eee;
}
</style>
