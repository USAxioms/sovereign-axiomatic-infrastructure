// src/core/E1GeneralIntelligence.js

export function computeE1GeneralIntelligence(signals) {
  // signals could include: taskPerformance, reasoningDepth, adaptation, flexibility, etc.
  const {
    taskPerformance = 0.90,
    reasoningDepth = 0.89,
    adaptation = 0.88,
    flexibility = 0.92,
    crossDomainAvg = 0.89,
  } = signals;

  const scores = [
    taskPerformance,
    reasoningDepth,
    adaptation,
    flexibility,
    crossDomainAvg,
  ];

  const sum = scores.reduce((a, b) => a + b, 0);
  return sum / scores.length; // E1 ∈ [0,1]
}
