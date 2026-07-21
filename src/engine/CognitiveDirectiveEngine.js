export class CognitiveDirectiveEngine {
  constructor({ Ledger }) {
    this.Ledger = Ledger
  }

  generateDirectives(fusedDecision) {
    const { decision, sources } = fusedDecision

    const directives = {
      timestamp: Date.now(),
      priority: this.computePriority(decision),
      actions: this.buildActions(decision, sources)
    }

    this.Ledger.record('cde-directives-generated', directives)
    return directives
  }

  computePriority(decision) {
    const confidence = decision.confidence || 0
    if (confidence > 0.9) return 'critical'
    if (confidence > 0.7) return 'high'
    if (confidence > 0.4) return 'medium'
    return 'low'
  }

  buildActions(decision, sources) {
    return [
      {
        type: 'log',
        description: decision.summary,
        sources
      },
      {
        type: 'execute',
        description: 'Apply fused decision to next autonomous cycle',
        payload: { decision, sources }
      }
    ]
  }
}
