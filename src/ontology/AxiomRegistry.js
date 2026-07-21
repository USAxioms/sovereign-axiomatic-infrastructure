export class AxiomRegistry {
  constructor({ Ledger }) {
    this.Ledger = Ledger
    this.axioms = new Map()
  }

  define(name, definition) {
    this.axioms.set(name, definition)
    this.Ledger.record('axiom-defined', { name, definition })
  }

  get(name) {
    return this.axioms.get(name) || null
  }

  list() {
    return Array.from(this.axioms.entries())
  }

  isAxiom(concept) {
    return this.axioms.has(concept)
  }
}
