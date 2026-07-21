/**
 * router/index.ts
 *
 * Vue Router configuration.
 *
 * Defines the main UI routes:
 *  - Home
 *  - Chip view
 *  - Jurisdiction view
 *  - Audit view
 */

import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";
import ChipView from "../components/ChipView.vue";
import JurisdictionView from "../components/JurisdictionView.vue";
import AuditView from "../components/AuditView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/chip/:id",
    name: "chip",
    component: ChipView,
    props: true
  },
  {
    path: "/jurisdiction/:id",
    name: "jurisdiction",
    component: JurisdictionView,
    props: true
  },
  {
    path: "/audit/:index",
    name: "audit",
    component: AuditView,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
