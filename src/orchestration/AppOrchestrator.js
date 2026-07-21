import { CognitiveOrchestrator } from '@/orchestration/CognitiveOrchestrator.js'
import { Execution } from '@/execution/AppExecution.js'
import { Interface } from '@/interface/AppInterface.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const Orchestrator = new CognitiveOrchestrator({
  Execution,
  Interface,
  Ledger
})
