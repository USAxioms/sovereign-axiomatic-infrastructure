<template>
  <div class="home">
    <h2>Welcome to the Sovereign Constitutional Engine</h2>

    <!-- ACTIVE CHIP -->
    <section class="panel">
      <h3>Active Chip</h3>

      <div v-if="ui.activeChipId">
        <router-link :to="`/chip/${ui.activeChipId}`">
          View Chip {{ ui.activeChipId }}
        </router-link>
      </div>

      <div v-else>
        No chip selected.
      </div>

      <button @click="createNewChip">
        Create New Chip
      </button>
    </section>

    <!-- JURISDICTIONS -->
    <section class="panel">
      <h3>Jurisdictions</h3>

      <ul>
        <li v-for="(flags, j) in constitution.jurisdiction" :key="j">
          <router-link :to="`/jurisdiction/${j}`">
            {{ j }}
          </router-link>
        </li>
      </ul>
    </section>

    <!-- AUDITS -->
    <section class="panel">
      <h3>Audits</h3>

      <ul>
        <li v-for="(audit, index) in audits" :key="index">
          <router-link :to="`/audit/${index}`">
            Audit #{{ index }}
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from "vue";

const uiStore = inject("uiStore");
const constitutionStore = inject("constitutionStore");
const constitutionService = inject("constitutionService");

const ui = uiStore.state;
const constitution = constitutionStore.state;

const audits = ref([]);

async function createNewChip() {
  const id = "chip-" + Math.floor(Math.random() * 100000);
  await constitutionService.createChip(id, 3, ["csl.free_speech"], [], 1n);
  uiStore.setActiveChip(id);
}

onMounted(async () => {
  // Load audits from chain
  try {
    const audit0 = await constitutionService.getAudit(0);
    audits.value.push(audit0);
  } catch {
    // No audits yet
  }
});
</script>

<style scoped>
.home {
  padding: 20px;
}

.panel {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
