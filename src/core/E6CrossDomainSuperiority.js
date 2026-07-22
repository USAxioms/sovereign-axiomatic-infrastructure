// src/core/E6CrossDomainSuperiority.js

export function computeE6CrossDomainSuperiority(signals) {
  // signals: domainScores array (per domain mastery)
  const {
    domainScores = [0.85, 0.91, 0.93, 0.92, 0.79, 0.88, 0.90],
  } = signals;

  if (!domainScores.length) return 0.0;

  const sum = domainScores.reduce((a, b) => a + b, 0);
  const avg = sum / domainScores.length;

  return Math.min(1.0, avg); // E6 ∈ [0,1]
}
