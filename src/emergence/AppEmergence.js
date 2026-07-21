import { EmergenceMetricsEngine } from '@/engine/EmergenceMetricsEngine.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const Emergence = new EmergenceMetricsEngine({
  Ledger
})
