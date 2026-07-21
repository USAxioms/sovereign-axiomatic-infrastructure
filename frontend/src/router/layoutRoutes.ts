/**
 * layoutRoutes.ts
 *
 * Router wrapper that applies the global Layout.vue shell
 * around all routed views.
 *
 * This ensures:
 *  - Global header
 *  - Global navigation
 *  - Global footer
 *  - Theme toggle
 *  - Consistent UI frame
 */

import Layout from "../components/Layout.vue";

import Home from "../components/Home.vue";
import ChipView from "../components/ChipView.vue";
import JurisdictionView from "../components/JurisdictionView.vue";
import AuditView from "../components/AuditView.vue";

export const layoutRoutes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: Home
      },
      {
        path: "chip/:id",
        name: "chip",
        component: ChipView,
        props: true
      },
      {
        path: "jurisdiction/:id",
        name: "jurisdiction",
        component: JurisdictionView,
        props: true
      },
      {
        path: "audit/:index",
        name: "audit",
        component: AuditView,
        props: true
      }
    ]
  }
];
