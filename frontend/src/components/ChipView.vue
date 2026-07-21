<template>
  <div class="chip-view">
    <h2>Chip: {{ chipId }}</h2>

    <!-- LOADING -->
    <div v-if="ui.loading" class="loading">
      Loading chip state…
    </div>

    <!-- ERROR -->
    <div v-if="ui.error" class="error">
      {{ ui.error }}
    </div>

    <!-- CHIP STATE -->
    <div v-if="state">
      <section class="panel">
        <h3>Constitutional State</h3>

        <p><strong>Satisfaction Score:</strong> {{ state.satisfactionScore }}</p>
        <p><strong>Fully Compliant:</strong> {{ state.fullyCompliant }}</p>

        <h4>Constraints</h4>
        <ul>
          <li v-for="c in state.constraints" :key="c.id">
            <strong>{{ c.id }}</strong> — satisfied: {{ c.satisfied }} — weight: {{ c.weight }}
          </li>
        </ul>
      </section>

      <!-- ACTIONS -->
      <section class="panel">
        <h3>Actions</h3>

        <button @click="stepChip">Step</button>
        <button @click="convergeChip">Converge</button>
        <button @click="commitChip">Commit</button>
        <button @click="submitCoherence">Submit Coherence</button>
        <button @click="submitTensor">Submit Tensor</button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const chipId = route.params.id as string;

const uiStore = inject("uiStore");
const constitutionStore = inject("constitutionStore");
const constitutionService = inject("constitutionService");

const ui = uiStore.state;
const state = computed(() => constitutionStore.state.chipState);

async function load() {
  await constitutionStore.loadChipState(chipId);
}

async function stepChip() {
  await constitutionService.step(chipId);
  await load();
}

async function convergeChip() {
  await constitutionService.converge(chipId);
  await load();
}

async function commitChip() {
  const commit = await constitutionService.commitState(chipId);
  console.log("Commit:", commit);
}

async function submitCoherence() {
  const commit = await constitutionService.commitState(chipId);
  await constitutionService.submitCoherence(commit.commit, commit.nonce, state.value.satisfactionScore);
}

async function submitTensor() {
  const commit = await constitutionService.commitState(chipId);
  const satisfied = state.value.constraints.map(c => c.satisfied);
  await constitutionService.submitTensor(commit.commit, commit.nonce, state.value.satisfactionScore, satisfied);
}

onMounted(load);
</script>

<style scoped>
.chip-view {
  padding: 20px;
}

.panel {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.loading {
  background: #ffe58f;
  padding: 10px;
  border-left: 4px solid #d4a017;
}

.error {
  background: #ffccc7;
  padding: 10px;
  border-left: 4px solid #cf1322;
}
</style>
