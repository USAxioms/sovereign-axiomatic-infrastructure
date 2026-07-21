export class GlobalCognitiveStateSynchronizer {
  constructor({ State, Ledger }) {
    this.State = State
    this.Ledger = Ledger
    this.globalState = {
      autonomy: null,
      planning: null,
      execution: null,
      emergence: null,
      diagnostics: null,
      performance: null,
      updatedAt: null
    }
  }

  sync(partial) {
    const timestamp = Date.now()

    this.globalState = {
      ...this.globalState,
      ...partial,
      updatedAt: timestamp
    }

    this.Ledger.record('gcss-sync', {
      updated: partial,
      timestamp
    })

    return this.globalState
  }

  async commit() {
    const committed = await this.State.transition(this.globalState)

    this.Ledger.record('gcss-commit', {
      committed,
      globalState: this.globalState
    })

    return committed
  }

  get() {
    return this.globalState
  }
}
