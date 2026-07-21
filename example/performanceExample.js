const { result, record } = await Performance.timeExecution(
  'diagnosis-workflow',
  async () => {
    return await Orchestrator.runWorkflow('medical-diagnosis', {
      concept: 'SymptomAnalysis',
      data: { symptoms: ['fever', 'cough'] },
      ontologyValid: true,
      withinConstraints: true,
      risk: 2.0e-15
    })
  }
)

console.log('Duration ms:', record.durationMs)

const stats = Performance.getStats('diagnosis-workflow')
console.log('Stats:', stats)
