export class PerformanceVelocityOptimizer {
  constructor({ Ledger }) {
    this.Ledger = Ledger
    this.history = []
  }

  async timeExecution(label, fn) {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()

    const record = {
      label,
      durationMs: end - start,
      timestamp: Date.now()
    }

    this.history.push(record)
    this.Ledger.record('performance-execution-timed', record)

    return { result, record }
  }

  getStats(label) {
    const records = this.history.filter(r => r.label === label)
    if (records.length === 0) return null

    const durations = records.map(r => r.durationMs)
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length
    const max = Math.max(...durations)
    const min = Math.min(...durations)

    const stats = { label, count: records.length, avg, min, max }
    this.Ledger.record('performance-stats', stats)
    return stats
  }
}
