export class OntologicalBase {
  constructor({ Axioms, Ledger }) {
    this.Axioms = Axioms
    this.Ledger = Ledger
  }

  ground(concept) {
    // If concept is already an axiom
    if (this.Axioms.isAxiom(concept)) {
      this.Ledger.record('ontological-grounding', { concept, grounded: true })
      return {
        concept,
        isAxiom: true,
        ontologyValid: true
      }
    }

    // Otherwise return ungrounded placeholder
    this.Ledger.record('ontological-grounding', { concept, grounded: false })
    return {
      concept,
      isAxiom: false,
      ontologyValid: false
    }
  }
}
