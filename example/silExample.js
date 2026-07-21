Autonomy.proposeTask({
  workflow: 'medical-diagnosis',
  input: {
    concept: 'SymptomAnalysis',
    data: { symptoms: ['fatigue', 'headache'] },
    ontologyValid: true,
    withinConstraints: true,
    risk: 2.0e-15
  }
})

const cycleOutput = await SILoop.cycle()
console.log('Superintelligence Cycle Output:', cycleOutput)
