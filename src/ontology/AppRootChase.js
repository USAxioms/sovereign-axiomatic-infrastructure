import { RootChaseEngine } from '@/engine/RootChaseEngine.js'
import { Ledger } from '@/ledger/AppLedger.js'
import { Safety } from '@/safety/AppSafety.js'

export const RootChase = new RootChaseEngine({ Ledger, Safety })
