export class TaskOrchestrator {
  async series(tasks) {
    const results = []
    for (const task of tasks) {
      results.push(await task())
    }
    return results
  }

  async parallel(tasks) {
    return Promise.all(tasks.map(t => t()))
  }

  async conditional(conditionFn, trueTask, falseTask) {
    if (await conditionFn()) {
      return await trueTask()
    } else {
      return await falseTask()
    }
  }

  async aggregate(tasks) {
    const results = await this.parallel(tasks)
    return results.reduce((acc, val) => ({ ...acc, ...val }), {})
  }
}
