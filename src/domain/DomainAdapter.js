export class DomainAdapter {
  constructor({ Axioms, ConceptSpace, Ledger }) {
    this.Axioms = Axioms
    this.ConceptSpace = ConceptSpace
    this.Ledger = Ledger
    this.domains = new Map()
  }

  registerDomain(name, config) {
    this.domains.set(name, config)
    this.Ledger.record('domain-registered', { name, config })
  }

  loadDomain(name) {
    const config = this.domains.get(name)
    if (!config) throw new Error(`Domain '${name}' not found`)

    // Load axioms
    for (const ax of config.axioms || []) {
      this.Axioms.define(ax.name, ax.definition)
    }

    // Load conceptual nodes
    for (const node of config.nodes || []) {
      this.ConceptSpace.defineNode(node.name, node.properties)
    }

    // Load relations
    for (const rel of config.relations || []) {
      this.ConceptSpace.defineRelation(rel.from, rel.to, rel.relation)
    }

    this.Ledger.record('domain-loaded', { name })
    return config
  }

  listDomains() {
    return Array.from(this.domains.keys())
  }
}
