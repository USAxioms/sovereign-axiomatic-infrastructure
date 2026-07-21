export class MDMEngine {
  constructor() {
    this.layers = {
      foundation: [],
      transformation: [],
      evaluation: [],
      meta: []
    }
  }

  registerComponent(layer, component) {
    if (!this.layers[layer]) {
      throw new Error(`Unknown MDM layer '${layer}'`)
    }
    this.layers[layer].push(component)
  }

  async execute(input) {
    let state = { ...input }

    // FOUNDATION LAYER
    for (const comp of this.layers.foundation) {
      state = await comp(state)
    }

    // TRANSFORMATION LAYER
    for (const comp of this.layers.transformation) {
      state = await comp(state)
    }

    // EVALUATION LAYER
    for (const comp of this.layers.evaluation) {
      state = await comp(state)
    }

    // META LAYER
    for (const comp of this.layers.meta) {
      state = await comp(state)
    }

    return state
  }

  listComponents() {
    return Object.fromEntries(
      Object.entries(this.layers).map(([layer, comps]) => [
        layer,
        comps.map(c => c.name || 'anonymous')
      ])
    )
  }
}
