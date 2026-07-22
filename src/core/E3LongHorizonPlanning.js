// src/core/E3LongHorizonPlanning.js

export function computeE3LongHorizonPlanning(signals) {
  // signals: planningHorizonYears, causalDepth, strategyQuality
  const {
    planningHorizonYears = 12.5,
    causalDepth = 0.84,
    strategyQuality = 0.86,
  } = signals;

  const horizonNorm = planningHorizonYears / 20.0; // 20 years as reference
  const raw = horizonNorm * causalDepth * strategyQuality;

  // Normalize to hit ~0.8+ for strong planners
  const normalized = raw / 0.55;

  return Math.min(1.0, normalized); // E3 ∈ [0,1]
}
