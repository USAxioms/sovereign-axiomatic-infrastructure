import { reactive } from 'vue'

export const Theme = reactive({
  mode: 'light',

  colors: {
    light: {
      background: '#ffffff',
      surface: '#f7f7f7',
      text: '#333333',
      primary: '#3a7bd5',
      border: '#e0e0e0'
    },
    dark: {
      background: '#1e1e1e',
      surface: '#2a2a2a',
      text: '#f0f0f0',
      primary: '#4a9eff',
      border: '#3a3a3a'
    }
  },

  typography: {
    fontFamily: 'Inter, sans-serif',
    baseSize: '16px',
    lineHeight: '1.5'
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },

  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px'
  },

  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.1)',
    md: '0 3px 6px rgba(0,0,0,0.15)',
    lg: '0 6px 12px rgba(0,0,0,0.2)'
  },

  setMode(mode) {
    this.mode = mode
  }
})
