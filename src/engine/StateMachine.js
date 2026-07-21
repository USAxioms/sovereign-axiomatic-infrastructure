export class StateMachine {
  constructor(config) {
    this.state = config.initial
    this.transitions = config.transitions
    this.onEnter = config.onEnter || {}
    this.onExit = config.onExit || {}
  }

  can(target) {
    const allowed = this.transitions[this.state] || []
    return allowed.includes(target)
  }

  go(target) {
    if (!this.can(target)) {
      throw new Error(`Invalid transition: ${this.state} → ${target}`)
    }

    if (this.onExit[this.state]) {
      this.onExit[this.state]()
    }

    this.state = target

    if (this.onEnter[target]) {
      this.onEnter[target]()
    }
  }
}
