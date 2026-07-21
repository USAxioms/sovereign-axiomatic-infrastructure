export class CognitiveLedger {
  constructor() {
    this.entries = []
  }

  record(step, data = {}) {
    this.entries.push({
      timestamp: new Date().toISOString(),
      step,
      data
    })
  }

  getAll() {
    return this.entries
  }

  getLatest(n = 1) {
    return this.entries.slice(-n)
  }

  clear() {
    this.entries = []
  }

  export() {
    return JSON.stringify(this.entries, null, 2)
  }
}
