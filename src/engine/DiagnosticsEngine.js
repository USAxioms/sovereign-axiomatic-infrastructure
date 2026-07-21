export class DiagnosticsEngine {
  constructor() {
    this.logs = []
    this.errors = []
    this.health = {
      modules: {},
      resources: {},
      system: 'ok'
    }
  }

  log(message, data = null) {
    const entry = {
      time: new Date().toISOString(),
      message,
      data
    }
    this.logs.push(entry)
    console.info('[LOG]', entry)
  }

  error(message, err = null) {
    const entry = {
      time: new Date().toISOString(),
      message,
      error: err?.stack || err
    }
    this.errors.push(entry)
    console.error('[ERROR]', entry)
  }

  setHealth(section, status) {
    this.health[section] = status
  }

  getHealth() {
    return {
      timestamp: new Date().toISOString(),
      ...this.health
    }
  }

  clear() {
    this.logs = []
    this.errors = []
  }
}
