export class CognitiveInterface {
  constructor({ Ledger }) {
    this.Ledger = Ledger
  }

  generateExplanation(result) {
    const pathway = result.pathway || []
    const explanation = pathway.map(step => {
      return {
        step: step.step,
        summary: this.summarize(step.data)
      }
    })

    this.Ledger.record('interface-explanation-generated', { explanation })
    return explanation
  }

  summarize(data) {
    if (!data) return 'No data available'

    if (data.isAxiom) {
      return `Grounded to axiom: ${data.concept}`
    }

    if (data.nav) {
      return `Conceptual navigation path: ${data.nav.join(' → ')}`
    }

    if (data.consistent !== undefined) {
      return `Logical consistency: ${data.consistent}`
    }

    if (data.ok !== undefined) {
      return `Safety validation: ${data.ok ? 'PASSED' : 'FAILED'}`
    }

    return JSON.stringify(data)
  }

  formatOutput(result, domainConfig = {}) {
    const explanation = this.generateExplanation(result)
    const output = {
      domain: domainConfig.name || 'generic',
      result: result.output,
      explanation
    }

    this.Ledger.record('interface-output-formatted', output)
    return output
  }
}
