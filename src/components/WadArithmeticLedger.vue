<script>
import { getLedger, pushState } from "../api/ledger.js";

export default {
  name: "WadArithmeticLedger",
  data() {
    return {
      ledger: null,
    };
  },
  methods: {
    async refreshLedger() {
      this.ledger = await getLedger();
    },
    async sendUpdate(payload) {
      await pushState(payload);
      await this.refreshLedger();
    }
  },
  mounted() {
    this.refreshLedger();
  }
};
</script>

<template>
  <div class="ledger">
    <h1>🧬 WAD ARITHMETIC LEDGER (LIVE)</h1>

    <pre v-if="ledger">{{ ledger }}</pre>

    <button @click="refreshLedger">🔄 Refresh</button>
  </div>
</template>

<style scoped>
pre {
  background: #111;
  color: #4caf50;
  padding: 16px;
  border-radius: 8px;
}
</style>
