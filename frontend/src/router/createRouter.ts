/**
 * createRouter.ts
 *
 * Final router bootstrap.
 *
 * This file:
 *  - Imports layoutRoutes
 *  - Creates the Vue Router instance
 *  - Applies history mode
 *  - Exports the final router
 */

import { createRouter, createWebHistory } from "vue-router";
import { layoutRoutes } from "./layoutRoutes";

export function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: layoutRoutes
  });
}
