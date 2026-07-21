import { WorkflowEngine } from '@/engine/WorkflowEngine.js'
import { Store } from '@/store/GlobalStore.js'

export const OnboardingWorkflow = new WorkflowEngine([
  {
    name: 'collectProfile',
    action: async () => console.log('Collecting profile...')
  },
  {
    name: 'verifyEmail',
    guard: () => !!Store.user?.email,
    action: async () => console.log('Sending verification email...')
  },
  {
    name: 'complete',
    action: async () => console.log('Onboarding complete!')
  }
])
