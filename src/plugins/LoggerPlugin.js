export default {
  async init() {
    console.log('Logger plugin initialized')
  },

  async onEvent(payload) {
    console.log('Event received:', payload)
  },

  async destroy() {
    console.log('Logger plugin destroyed')
  }
}
