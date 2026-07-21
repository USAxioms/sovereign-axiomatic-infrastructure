export class CognitiveActionEngine {
  constructor({ SILoop, GCSS, Ledger }) {
    this.SILoop = SILoop
    this.GCSS = GCSS
    this.Ledger = Ledger
  }

  async execute(directives) {
    const actions = directives.actions || []
    const results = []

    for (const action of actions) {
      const result = await this.runAction(action)
      results.push({ action, result })
    }

    const output = {
      timestamp: Date.now(),
      priority: directives.priority,
      results
    }

    this.Ledger.record('cae-executed', output)
    return output
  }

  async runAction(action) {
    switch (action.type) {
      case 'log':
        this.Ledger.record('cae-log', action)
        return { ok: true }

      case 'execute':
        return await this.executeCycle(action.payload)

      case 'state-update':
        return await this.updateState(action.payload)

      default:
        return { ok: false, reason: 'unknown-action-type' }
    }
  }

  async executeCycle(payload) {
    const cycle = await this.SILoop.cycle()
    this.GCSS.sync({ lastCycle: cycle })
    return cycle
  }

  async updateState(payload) {
    const updated = this.GCSS.sync(payload)
    const committed = await this.GCSS.commit()
    return { updated, committed }
  }
}
