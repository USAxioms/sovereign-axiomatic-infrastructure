// src/core/SuperintelligenceLoopEngine.js

import { computeE1GeneralIntelligence } from "./E1GeneralIntelligence.js";
import { computeE2AutonomousGoalFormation } from "./E2AutonomousGoalFormation.js";
import { computeE3LongHorizonPlanning } from "./E3LongHorizonPlanning.js";
import { computeE4AnalyticalReasoning } from "./E4AnalyticalReasoning.js";
import { computeE5WorldModeling } from "./E5WorldModeling.js";
import { computeE6CrossDomainSuperiority } from "./E6CrossDomainSuperiority.js";

import { generateLedger } from "../csl/CognitiveStateLedger.js";

export default class SuperintelligenceLoopEngine {
  constructor(systemId = "advanceer-usi") {
    this.systemId = systemId;

    // The evolving cognitive state
    this.state = {
      // Raw signals (can be updated externally or internally)
      signals: {}
    };
  }

  updateSignals(partialSignals) {
    this.state.signals = {
      ...this.state.signals,
      ...partialSignals
    };
  }

  computeAllElements() {
    const s = this.state.signals;

    return {
      e1: computeE1GeneralIntelligence(s),
      e2: computeE2AutonomousGoalFormation(s),
      e3: computeE3LongHorizonPlanning(s),
      e4: computeE4AnalyticalReasoning(s),
      e5: computeE5WorldModeling(s),
      e6: computeE6CrossDomainSuperiority(s),
    };
  }

  step() {
    // Compute all six elements
    const elements = this.computeAllElements();

    // Bind them into the state for the ledger
    this.state = {
      ...this.state,
      ...elements
    };

    // Generate the full ledger output
    const ledger = generateLedger(this.systemId, this.state);

    return ledger;
  }
}
