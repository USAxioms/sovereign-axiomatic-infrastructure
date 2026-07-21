import { GlobalCognitiveStateSynchronizer } from '@/engine/GlobalCognitiveStateSynchronizer.js'
import { State } from '@/state/AppState.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const GCSS = new GlobalCognitiveStateSynchronizer({
  State,
  Ledger
})
