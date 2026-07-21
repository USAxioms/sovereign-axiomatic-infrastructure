import { SuperintelligenceLoopEngine } from '@/engine/SuperintelligenceLoopEngine.js'
import { Autonomy } from '@/autonomy/AppAutonomy.js'
import { Planning } from '@/planning/AppPlanning.js'
import { Orchestrator } from '@/orchestration/AppOrchestrator.js'
import { Emergence } from '@/emergence/AppEmergence.js'
import { Performance } from '@/performance/AppPerformance.js'
import { MetaCog } from '@/metacognition/AppMetaCognition.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const SILoop = new SuperintelligenceLoopEngine({
  Autonomy,
  Planning,
  Orchestrator,
  Emergence,
  Performance,
  MetaCog,
  Ledger
})
