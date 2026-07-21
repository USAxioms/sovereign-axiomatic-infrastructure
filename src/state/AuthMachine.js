import { StateMachine } from '@/engine/StateMachine.js'

export const AuthMachine = new StateMachine({
  initial: 'loggedOut',

  transitions: {
    loggedOut: ['loggingIn'],
    loggingIn: ['loggedIn', 'error'],
    loggedIn: ['loggingOut'],
    loggingOut: ['loggedOut'],
    error: ['loggingIn']
  },

  onEnter: {
    loggingIn: () => console.log('Attempting login...'),
    loggedIn: () => console.log('User logged in'),
    error: () => console.log('Login failed')
  },

  onExit: {
    loggingIn: () => console.log('Finished login attempt')
  }
})
