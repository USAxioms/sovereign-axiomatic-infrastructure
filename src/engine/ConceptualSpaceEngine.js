export class ConceptualSpaceEngine {
  constructor({ Ledger }) {
    this.Ledger = Ledger
    this.nodes = new Map()
    this.edges = new Map()
  }

  defineNode(name, properties = {}) {
    this.nodes.set(name, properties)
    this.Ledger.record('concept-node-defined', { name, properties })
  }

  defineRelation(from, to, relation) {
    if (!this.edges.has(from)) {
      this.edges.set(from, [])
    }
    this.edges.get(from).push({ to, relation })
    this.Ledger.record('concept-relation-defined', { from, to, relation })
  }

  getNode(name) {
    return this.nodes.get(name) || null
  }

  getRelations(name) {
    return this.edges.get(name) || []
  }

  navigate(start, goal) {
    const visited = new Set()
    const queue = [{ node: start, path: [start] }]

    while (queue.length > 0) {
      const { node, path } = queue.shift()

      if (node === goal) {
        this.Ledger.record('concept-navigation-complete', { start, goal, path })
        return path
      }

      visited.add(node)

      for (const edge of this.getRelations(node)) {
        if (!visited.has(edge.to)) {
          queue.push({ node: edge.to, path: [...path, edge.to] })
        }
      }
    }

    this.Ledger.record('concept-navigation-failed', { start, goal })
    return null
  }
}
