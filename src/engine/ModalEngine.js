import { reactive } from 'vue'

export const ModalEngine = reactive({
  stack: [],

  open(component, props = {}) {
    this.stack.push({ component, props })
  },

  close() {
    this.stack.pop()
  },

  closeAll() {
    this.stack = []
  }
})
