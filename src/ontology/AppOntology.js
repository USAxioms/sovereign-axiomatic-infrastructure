import { AxiomRegistry } from '@/ontology/AxiomRegistry.js'
import { OntologicalBase } from '@/ontology/OntologicalBase.js'
import { Ledger } from '@/ledger/AppLedger.js'

export const Axioms = new AxiomRegistry({ Ledger })
export const Ontology = new OntologicalBase({ Axioms, Ledger })
