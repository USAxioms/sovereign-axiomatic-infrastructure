/**
 * main.ts
 *
 * UI entry point.
 *
 * This file:
 *  - Imports the frontend bootstrap (app.ts)
 *  - Initializes the UI framework (Vue/React/Svelte)
 *  - Provides constitutionStore + uiStore to the UI
 *  - Mounts the root component
 *
 * Replace the framework section with your actual UI framework.
 */

import { createApp } from "vue"; // If React/Svelte, replace accordingly
import App from "./components/App.vue"; // Replace with your root component

import {
  constitutionStore,
  uiStore,
  constitutionService
} from "./app";

// ------------------------------------------------------------
// CREATE UI APP
// ------------------------------------------------------------

const app = createApp(App);

// ------------------------------------------------------------
// PROVIDE GLOBALS
// ------------------------------------------------------------

app.provide("constitutionStore", constitutionStore);
app.provide("uiStore", uiStore);
app.provide("constitutionService", constitutionService);

// ------------------------------------------------------------
// MOUNT
// ------------------------------------------------------------

app.mount("#app");
