import { CognitiveAutonomyEngine } from '@/engine/CognitiveAutonomyEngine.js'
import { Orchestrator } from '@/orchestration/AppOrchestrator.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const Autonomy = new CognitiveAutonomyEngine({
  Orchestrator,
  Ledger
})
