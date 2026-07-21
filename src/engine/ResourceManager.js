export class ResourceManager {
  constructor() {
    this.cache = new Map()
  }

  async load(key, loaderFn) {
    if (this.cache.has(key)) {
      return this.cache.get(key)
    }

    const resource = await loaderFn()
    this.cache.set(key, resource)
    return resource
  }

  get(key) {
    return this.cache.get(key)
  }

  release(key) {
    this.cache.delete(key)
  }

  releaseAll() {
    this.cache.clear()
  }
}
