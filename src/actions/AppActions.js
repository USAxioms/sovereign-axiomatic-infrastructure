import { CognitiveActionEngine } from '@/engine/CognitiveActionEngine.js'
import { SILoop } from '@/sil/AppSuperintelligenceLoop.js'
import { GCSS } from '@/gcss/AppGCSS.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const Actions = new CognitiveActionEngine({
  SILoop,
  GCSS,
  Ledger
})
