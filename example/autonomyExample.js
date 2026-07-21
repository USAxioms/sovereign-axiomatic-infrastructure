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

Autonomy.prioritize((a, b) => 0) // plug in your own priority logic

const result = await Autonomy.runNext()
console.log(result)
