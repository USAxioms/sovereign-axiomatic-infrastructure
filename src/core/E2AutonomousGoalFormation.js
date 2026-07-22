// src/core/E2AutonomousGoalFormation.js

export function computeE2AutonomousGoalFormation(signals) {
  // signals: novelGoals, totalGoals, emergenceMetric, autonomyScore
  const {
    novelGoals = 12,
    totalGoals = 20,
    emergenceMetric = 2.8,
    autonomyScore = 0.79,
  } = signals;

  const noveltyRatio = totalGoals > 0 ? novelGoals / totalGoals : 0;
  const emergenceFactor = 1 + emergenceMetric / 2;

  const raw = noveltyRatio * emergenceFactor;
  const combined = (raw + autonomyScore) / 2.0;

  return Math.min(1.0, combined); // E2 ∈ [0,1]
}
