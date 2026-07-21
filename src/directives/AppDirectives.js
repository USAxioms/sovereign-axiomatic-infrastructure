import { CognitiveDirectiveEngine } from '@/engine/CognitiveDirectiveEngine.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const Directives = new CognitiveDirectiveEngine({
  Ledger
})
