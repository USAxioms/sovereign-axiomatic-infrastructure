export class ActionQueue {
  constructor() {
    this.queue = []
    this.running = false
  }

  enqueue(action) {
    this.queue.push(action)
    this.process()
  }

  async process() {
    if (this.running) return
    this.running = true

    while (this.queue.length > 0) {
      const action = this.queue.shift()

      try {
        await action()
      } catch (err) {
        console.error('Action failed:', err)
      }
    }

    this.running = false
  }

  clear() {
    this.queue = []
  }
}
