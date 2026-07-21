import { R3Processor } from '@/engine/R3Processor.js'
import { Safety } from '@/safety/AppSafety.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const R3 = new R3Processor({ Safety, Ledger })
