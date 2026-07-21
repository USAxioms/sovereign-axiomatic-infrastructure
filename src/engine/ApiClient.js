import { EventBus } from '@/engine/EventBus.js'

const cache = new Map()

export const ApiClient = {
  async get(url, { useCache = false } = {}) {
    if (useCache && cache.has(url)) {
      return cache.get(url)
    }

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()

      if (useCache) cache.set(url, data)

      return data
    } catch (err) {
      EventBus.emit('api:error', err.message)
      throw err
    }
  },

  async post(url, body = {}) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      return await res.json()
    } catch (err) {
      EventBus.emit('api:error', err.message)
      throw err
    }
  }
}
