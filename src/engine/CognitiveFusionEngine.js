export class CognitiveFusionEngine {
  constructor({ Ledger }) {
    this.Ledger = Ledger
  }

  fuse(inputs) {
    const fused = {
      timestamp: Date.now(),
      decision: this.combine(inputs),
      sources: Object.keys(inputs),
      raw: inputs
    }

    this.Ledger.record('cfe-fused', fused)
    return fused
  }

  combine(inputs) {
    const weights = {
      autonomy: 1.0,
      planning: 1.2,
      execution: 1.5,
      emergence: 0.8,
      diagnostics: 1.3,
      performance: 0.7,
      global: 1.4
    }

    const score = Object.entries(inputs).reduce((acc, [key, value]) => {
      const w = weights[key] || 1
      const v = this.extractValue(value)
      return acc + w * v
    }, 0)

    return {
      score,
      confidence: Math.min(1, score / 100),
      summary: `Fused cognitive score: ${score.toFixed(2)}`
    }
  }

  extractValue(obj) {
    if (!obj) return 0

    if (typeof obj === 'number') return obj

    if (obj.durationMs) return Math.max(0, 200 - obj.durationMs)

    if (obj.Em) return obj.Em

    if (obj.flags) return Math.max(0, 10 - obj.flags.length)

    if (obj.steps) return obj.steps.length * 5

    return 1
  }
}
