import { ref } from 'vue'

export const TransitionEngine = {
  fade(duration = 300) {
    return {
      enterActiveClass: 'fade-enter-active',
      leaveActiveClass: 'fade-leave-active',
      enterFromClass: 'fade-enter-from',
      leaveToClass: 'fade-leave-to',
      duration
    }
  },

  slide(duration = 300) {
    return {
      enterActiveClass: 'slide-enter-active',
      leaveActiveClass: 'slide-leave-active',
      enterFromClass: 'slide-enter-from',
      leaveToClass: 'slide-leave-to',
      duration
    }
  }
}
