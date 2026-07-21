<template>
  <div class="audit-view">
    <h2>Audit #{{ auditIndex }}</h2>

    <!-- LOADING -->
    <div v-if="ui.loading" class="loading">
      Loading audit…
    </div>

    <!-- ERROR -->
    <div v-if="ui.error" class="error">
      {{ ui.error }}
    </div>

    <!-- AUDIT DATA -->
    <div v-if="audit">
      <section class="panel">
        <h3>Audit Details</h3>

        <p><strong>Proof Hash:</strong> {{ audit.proofHash }}</p>
        <p><strong>Jurisdiction:</strong> {{ audit.jurisdiction }}</p>
        <p><strong>Auditor:</strong> {{ audit.auditor }}</p>
      </section>

      <section class="panel">
        <h3>Submit New Audit Proof</h3>

        <input v-model="newProof" placeholder="Proof hash" />
        <input v-model="newJurisdiction" placeholder="Jurisdiction" />
        <input v-model="newAuditor" placeholder="Auditor" />

        <button @click="submitAudit">Submit Audit Proof</button>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const auditIndex = Number(route.params.index);

const uiStore = inject("uiStore");
const constitutionService = inject("constitutionService");

const ui = uiStore.state;
const audit = ref<any>(null);

const newProof = ref("");
const newJurisdiction = ref("");
const newAuditor = ref("");

async function load() {
  try {
    audit.value = await constitutionService.getAudit(auditIndex);
  } catch (err) {
    uiStore.setError("Audit not found");
  }
}

async function submitAudit() {
  if (!newProof.value || !newJurisdiction.value || !newAuditor.value) return;

  await constitutionService.submitAuditProof(
    newProof.value,
    newJurisdiction.value,
    newAuditor.value
  );

  newProof.value = "";
  newJurisdiction.value = "";
  newAuditor.value = "";

  await load();
}

onMounted(load);
</script>

<style scoped>
.audit-view {
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
