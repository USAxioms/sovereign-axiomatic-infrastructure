export class CognitiveAutonomyEngine {
  constructor({ Orchestrator, Ledger }) {
    this.Orchestrator = Orchestrator
    this.Ledger = Ledger
    this.queue = []
  }

  proposeTask(task) {
    this.queue.push(task)
    this.Ledger.record('autonomy-task-proposed', { task })
  }

  prioritize(fn) {
    this.queue.sort(fn)
    this.Ledger.record('autonomy-queue-prioritized', { queue: this.queue })
  }

  async runNext() {
    const next = this.queue.shift()
    if (!next) {
      this.Ledger.record('autonomy-no-task', {})
      return null
    }

    this.Ledger.record('autonomy-task-start', { task: next })
    const result = await this.Orchestrator.runWorkflow(next.workflow, next.input)
    this.Ledger.record('autonomy-task-result', { task: next, result })

    return result
  }

  hasTasks() {
    return this.queue.length > 0
  }
}
