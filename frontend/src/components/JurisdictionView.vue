<template>
  <div class="jurisdiction-view">
    <h2>Jurisdiction: {{ jurisdictionId }}</h2>

    <!-- LOADING -->
    <div v-if="ui.loading" class="loading">
      Loading jurisdiction…
    </div>

    <!-- ERROR -->
    <div v-if="ui.error" class="error">
      {{ ui.error }}
    </div>

    <!-- JURISDICTION DATA -->
    <div v-if="constraints || flags">
      <section class="panel">
        <h3>Constraints</h3>

        <ul>
          <li v-for="c in constraints" :key="c">
            {{ c }}
          </li>
        </ul>

        <input v-model="newConstraint" placeholder="Add constraint" />
        <button @click="addConstraint">Submit Constraint</button>
      </section>

      <section class="panel">
        <h3>Regulatory Flags</h3>

        <ul>
          <li v-for="f in flags" :key="f">
            {{ f }}
          </li>
        </ul>

        <input v-model="newFlag" placeholder="Add regulatory flag" />
        <button @click="addFlag">Submit Flag</button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const jurisdictionId = route.params.id as string;

const uiStore = inject("uiStore");
const constitutionStore = inject("constitutionStore");
const constitutionService = inject("constitutionService");

const ui = uiStore.state;

const constraints = computed(() => constitutionStore.state.jurisdiction[jurisdictionId]);
const flags = computed(() => constitutionStore.state.regulatory[jurisdictionId]);

const newConstraint = ref("");
const newFlag = ref("");

async function load() {
  await constitutionStore.loadJurisdiction(jurisdictionId);
  await constitutionStore.loadRegulatory(jurisdictionId);
}

async function addConstraint() {
  if (!newConstraint.value) return;
  await constitutionService.submitJurisdiction(jurisdictionId, [newConstraint.value]);
  newConstraint.value = "";
  await load();
}

async function addFlag() {
  if (!newFlag.value) return;
  await constitutionService.submitRegulatoryFlags(jurisdictionId, [newFlag.value]);
  newFlag.value = "";
  await load();
}

onMounted(load);
</script>

<style scoped>
.jurisdiction-view {
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
