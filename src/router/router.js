import { reactive } from 'vue'

export const Router = reactive({
  current: 'home',
  routes: {},

  register(name, component) {
    this.routes[name] = component
  },

  go(name) {
    if (this.routes[name]) {
      this.current = name
    } else {
      console.warn(`Route "${name}" not found`)
    }
  }
})
