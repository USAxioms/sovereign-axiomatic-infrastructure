export class PackageManager {
  constructor() {
    this.manifest = {}
    this.env = 'development'
  }

  loadManifest(manifest) {
    this.manifest = manifest
  }

  setEnv(env) {
    this.env = env
  }

  getEnv() {
    return this.env
  }

  getPackage(name) {
    return this.manifest.packages?.[name] || null
  }

  async loadBundle(name) {
    const pkg = this.getPackage(name)
    if (!pkg) throw new Error(`Package '${name}' not found`)

    const mod = await import(pkg.entry)
    return mod.default || mod
  }

  listPackages() {
    return Object.keys(this.manifest.packages || {})
  }
}
