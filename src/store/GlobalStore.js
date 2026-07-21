import { reactive } from 'vue'

export const Store = reactive({
  user: null,
  settings: {},
  notifications: [],
  theme: 'light',

  setUser(data) {
    this.user = data
  },

  setSetting(key, value) {
    this.settings[key] = value
  },

  addNotification(note) {
    this.notifications.unshift({
      ...note,
      time: new Date().toLocaleTimeString()
    })
  },

  setTheme(mode) {
    this.theme = mode
  }
})
