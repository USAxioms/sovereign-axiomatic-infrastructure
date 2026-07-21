export class ModuleLoader {
  constructor() {
    this.modules = new Map()
  }

  async load(name, path) {
    if (this.modules.has(name)) {
      return this.modules.get(name)
    }

    const mod = await import(path)

    const instance = mod.default || mod
    if (instance.init) {
      await instance.init()
    }

    this.modules.set(name, instance)
    return instance
  }

  get(name) {
    return this.modules.get(name)
  }

  async unload(name) {
    const mod = this.modules.get(name)
    if (!mod) return

    if (mod.destroy) {
      await mod.destroy()
    }

    this.modules.delete(name)
  }

  async unloadAll() {
    for (const [name, mod] of this.modules.entries()) {
      if (mod.destroy) {
        await mod.destroy()
      }
    }
    this.modules.clear()
  }
}
