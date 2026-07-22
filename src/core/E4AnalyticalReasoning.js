// src/core/E4AnalyticalReasoning.js

export function computeE4AnalyticalReasoning(signals) {
  // Domain-general reasoning metrics
  const {
    logicalConsistency = 0.94,
    causalInference = 0.91,
    evidenceWeighting = 0.93,
    hypothesisQuality = 0.90,
    uncertaintyModeling = 0.88,
    crossDomainTransfer = 0.92,
  } = signals;

  const scores = [
    logicalConsistency,
    causalInference,
    evidenceWeighting,
    hypothesisQuality,
    uncertaintyModeling,
    crossDomainTransfer,
  ];

  const sum = scores.reduce((a, b) => a + b, 0);
  const avg = sum / scores.length;

  return Math.min(1.0, avg); // E4 ∈ [0,1]
}
