const updated = GCSS.sync({
  autonomy: { nextTask: 'diagnosis' },
  planning: { steps: 7 },
  execution: { lastResult: 'ok' },
  emergence: { Em: 12.4, Vr: 0.03 },
  diagnostics: { flags: [] },
  performance: { durationMs: 180 }
})

console.log('Updated Global State:', updated)

const committed = await GCSS.commit()
console.log('Committed State:', committed)
