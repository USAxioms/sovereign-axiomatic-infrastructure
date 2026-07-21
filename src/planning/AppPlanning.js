import { LongHorizonPlanningEngine } from '@/engine/LongHorizonPlanningEngine.js'
import { R3 } from '@/r3/AppR3.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const Planning = new LongHorizonPlanningEngine({
  R3,
  Ledger
})
