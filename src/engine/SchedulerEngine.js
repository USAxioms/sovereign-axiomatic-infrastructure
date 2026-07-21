export class SchedulerEngine {
  constructor() {
    this.jobs = new Map()
    this.id = 0
  }

  timeout(fn, ms) {
    const jobId = ++this.id
    const handle = setTimeout(() => {
      fn()
      this.jobs.delete(jobId)
    }, ms)

    this.jobs.set(jobId, { type: 'timeout', handle })
    return jobId
  }

  interval(fn, ms) {
    const jobId = ++this.id
    const handle = setInterval(fn, ms)

    this.jobs.set(jobId, { type: 'interval', handle })
    return jobId
  }

  cancel(jobId) {
    const job = this.jobs.get(jobId)
    if (!job) return

    if (job.type === 'timeout') clearTimeout(job.handle)
    if (job.type === 'interval') clearInterval(job.handle)

    this.jobs.delete(jobId)
  }

  cancelAll() {
    for (const [id, job] of this.jobs.entries()) {
      if (job.type === 'timeout') clearTimeout(job.handle)
      if (job.type === 'interval') clearInterval(job.handle)
    }
    this.jobs.clear()
  }
}
