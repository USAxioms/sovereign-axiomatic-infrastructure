export class Sandbox {
  async run(fn, options = {}) {
    const {
      timeout = 2000,   // max time allowed
      fallback = null   // fallback value if failure
    } = options

    return new Promise((resolve) => {
      let finished = false

      const timer = setTimeout(() => {
        if (!finished) {
          finished = true
          resolve(fallback)
        }
      }, timeout)

      try {
        const result = fn()
        if (result instanceof Promise) {
          result.then(res => {
            if (!finished) {
              finished = true
              clearTimeout(timer)
              resolve(res)
            }
          }).catch(() => {
            if (!finished) {
              finished = true
              clearTimeout(timer)
              resolve(fallback)
            }
          })
        } else {
          finished = true
          clearTimeout(timer)
          resolve(result)
        }
      } catch {
        if (!finished) {
          finished = true
          clearTimeout(timer)
          resolve(fallback)
        }
      }
    })
  }
}
