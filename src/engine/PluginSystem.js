export class PluginSystem {
  constructor() {
    this.plugins = new Map()
  }

  async register(name, plugin) {
    if (this.plugins.has(name)) {
      throw new Error(`Plugin '${name}' already registered`)
    }

    if (plugin.init) {
      await plugin.init()
    }

    this.plugins.set(name, plugin)
  }

  async executeHook(hookName, payload) {
    for (const plugin of this.plugins.values()) {
      if (plugin[hookName]) {
        await plugin[hookName](payload)
      }
    }
  }

  async unregister(name) {
    const plugin = this.plugins.get(name)
    if (!plugin) return

    if (plugin.destroy) {
      await plugin.destroy()
    }

    this.plugins.delete(name)
  }

  async unregisterAll() {
    for (const [name, plugin] of this.plugins.entries()) {
      if (plugin.destroy) {
        await plugin.destroy()
      }
    }
    this.plugins.clear()
  }
}
