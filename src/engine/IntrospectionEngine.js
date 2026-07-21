export class IntrospectionEngine {
  constructor({ Modules, Plugins, Resources, TelemetryLayer, Diagnostics, Packages }) {
    this.Modules = Modules
    this.Plugins = Plugins
    this.Resources = Resources
    this.TelemetryLayer = TelemetryLayer
    this.Diagnostics = Diagnostics
    this.Packages = Packages
  }

  snapshot() {
    return {
      timestamp: new Date().toISOString(),

      modules: Array.from(this.Modules.modules.keys()),
      plugins: Array.from(this.Plugins.plugins.keys()),
      resources: Array.from(this.Resources.cache.keys()),
      packages: this.Packages.listPackages(),

      telemetry: this.TelemetryLayer.snapshot(),
      diagnostics: {
        logs: this.Diagnostics.logs.slice(-10),
        errors: this.Diagnostics.errors.slice(-10),
        health: this.Diagnostics.getHealth()
      },

      environment: this.Packages.getEnv()
    }
  }

  print() {
    console.table(this.snapshot())
  }
}
