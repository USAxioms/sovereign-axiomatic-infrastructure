import { ReasoningPathwayEngine } from '@/engine/ReasoningPathwayEngine.js'
import { Ontology } from '@/ontology/AppOntology.js'
import { ConceptSpace } from '@/concept/AppConceptualSpace.js'
import { MDM } from '@/mdm/AppMDM.js'
import { Safety } from '@/safety/AppSafety.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const Reasoning = new ReasoningPathwayEngine({
  Ontology,
  ConceptSpace,
  MDM,
  Safety,
  Ledger
})
