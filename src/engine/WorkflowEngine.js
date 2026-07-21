export class WorkflowEngine {
  constructor(steps) {
    this.steps = steps
    this.index = 0
  }

  get current() {
    return this.steps[this.index]
  }

  canNext() {
    const step = this.current
    return !step.guard || step.guard()
  }

  async next() {
    const step = this.current

    if (!this.canNext()) {
      throw new Error(`Guard blocked transition at step: ${step.name}`)
    }

    if (step.action) {
      await step.action()
    }

    if (this.index < this.steps.length - 1) {
      this.index++
    }
  }

  async back() {
    if (this.index > 0) {
      this.index--
    }
  }

  reset() {
    this.index = 0
  }

  isComplete() {
    return this.index >= this.steps.length - 1
  }
}
