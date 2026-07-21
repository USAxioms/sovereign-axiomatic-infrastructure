export class Persistence {
  constructor(namespace = 'app') {
    this.ns = namespace
  }

  key(name) {
    return `${this.ns}:${name}`
  }

  set(name, value) {
    const data = JSON.stringify(value)
    localStorage.setItem(this.key(name), data)
  }

  get(name) {
    const raw = localStorage.getItem(this.key(name))
    try {
      return raw ? JSON.parse(raw) : null
    } catch {
      return raw
    }
  }

  remove(name) {
    localStorage.removeItem(this.key(name))
  }

  clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(this.ns + ':'))
      .forEach(k => localStorage.removeItem(k))
  }
}
