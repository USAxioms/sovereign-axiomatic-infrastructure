// src/api/ledger.js

import SuperintelligenceLoopEngine from "../core/SuperintelligenceLoopEngine.js";

const engine = new SuperintelligenceLoopEngine();

export function pushState(update) {
  engine.updateState(update);
  return { ok: true };
}

export function getLedger() {
  return engine.step();
}
