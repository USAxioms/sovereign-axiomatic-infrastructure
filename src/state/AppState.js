import { CognitiveStateManager } from '@/engine/CognitiveStateManager.js'
import { MDM } from '@/mdm/AppMDM.js'
import { Safety } from '@/safety/AppSafety.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const State = new CognitiveStateManager({ MDM, Safety, Ledger })
