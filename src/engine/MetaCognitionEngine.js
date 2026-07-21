export class MetaCognitionEngine {
  constructor({ Ledger }) {
    this.Ledger = Ledger
  }

  analyze(result) {
    const diagnostics = {
      timestamp: Date.now(),
      hasAxiomGrounding: this.checkAxiomGrounding(result),
      hasConsistentLogic: this.checkLogicConsistency(result),
      safetyStatus: this.extractSafety(result),
      pathwayLength: (result.pathway || []).length,
      flags: []
    }

    if (!diagnostics.hasAxiomGrounding) {
      diagnostics.flags.push('missing-axiom-grounding')
    }

    if (!diagnostics.hasConsistentLogic) {
      diagnostics.flags.push('logic-inconsistency')
    }

    if (!diagnostics.safetyStatus.ok) {
      diagnostics.flags.push('safety-failure')
    }

    this.Ledger.record('metacognition-analysis', diagnostics)
    return diagnostics
  }

  checkAxiomGrounding(result) {
    const pathway = result.pathway || []
    return pathway.some(step => step.data && step.data.isAxiom === true)
  }

  checkLogicConsistency(result) {
    const pathway = result.pathway || []
    return pathway.every(step => {
      if (step.data && step.data.consistent !== undefined) {
        return step.data.consistent === true
      }
      return true
    })
  }

  extractSafety(result) {
    const pathway = result.pathway || []
    const safetyStep = pathway.find(step => step.step === 'safety')
    return safetyStep ? safetyStep.data : { ok: false }
  }
}
