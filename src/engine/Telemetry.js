export class Telemetry {
  constructor() {
    this.counters = {}
    this.timers = {}
    this.gauges = {}
  }

  // COUNTERS
  increment(name, amount = 1) {
    this.counters[name] = (this.counters[name] || 0) + amount
  }

  getCounter(name) {
    return this.counters[name] || 0
  }

  // TIMERS
  startTimer(name) {
    this.timers[name] = performance.now()
  }

  stopTimer(name) {
    const start = this.timers[name]
    if (!start) return null
    const duration = performance.now() - start
    delete this.timers[name]
    return duration
  }

  // GAUGES
  setGauge(name, value) {
    this.gauges[name] = value
  }

  getGauge(name) {
    return this.gauges[name]
  }

  // SNAPSHOT
  snapshot() {
    return {
      timestamp: new Date().toISOString(),
      counters: { ...this.counters },
      gauges: { ...this.gauges }
    }
  }

  clear() {
    this.counters = {}
    this.timers = {}
    this.gauges = {}
  }
}
