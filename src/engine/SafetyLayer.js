export class SafetyLayer {
  constructor() {
    this.layers = []
  }

  addLayer(name, validatorFn) {
    this.layers.push({ name, validatorFn })
  }

  async validate(input) {
    const results = []

    for (const layer of this.layers) {
      try {
        const ok = await layer.validatorFn(input)
        results.push({ layer: layer.name, ok })
        if (!ok) return { ok: false, results }
      } catch {
        results.push({ layer: layer.name, ok: false })
        return { ok: false, results }
      }
    }

    return { ok: true, results }
  }

  getLayerNames() {
    return this.layers.map(l => l.name)
  }
}
