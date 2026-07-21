export class CognitiveOrchestrator {
  constructor({ Execution, Interface, Ledger }) {
    this.Execution = Execution
    this.Interface = Interface
    this.Ledger = Ledger
    this.workflows = new Map()
  }

  defineWorkflow(name, steps) {
    this.workflows.set(name, steps)
    this.Ledger.record('workflow-defined', { name, steps })
  }

  listWorkflows() {
    return Array.from(this.workflows.keys())
  }

  async runWorkflow(name, input) {
    const steps = this.workflows.get(name)
    if (!steps) throw new Error(`Workflow '${name}' not found`)

    this.Ledger.record('workflow-start', { name, input })

    let context = input

    for (const step of steps) {
      this.Ledger.record('workflow-step-start', { step })

      const result = await this.Execution.execute({
        ...context,
        concept: step.concept || context.concept
      })

      this.Ledger.record('workflow-step-result', { step, result })

      if (!result.ok) {
        this.Ledger.record('workflow-abort', { step, reason: 'execution-failed' })
        return {
          ok: false,
          failedStep: step,
          output: null
        }
      }

      // Update context for next step
      context = result.output
    }

    // Final human-facing output
    const formatted = this.Interface.formatOutput(
      { output: context, pathway: [] },
      { name }
    )

    this.Ledger.record('workflow-complete', { name, formatted })

    return {
      ok: true,
      output: formatted
    }
  }
}
