import { DomainAdapter } from '@/domain/DomainAdapter.js'
import { Axioms } from '@/ontology/AppOntology.js'
import { ConceptSpace } from '@/concept/AppConceptualSpace.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const Domains = new DomainAdapter({
  Axioms,
  ConceptSpace,
  Ledger
})
