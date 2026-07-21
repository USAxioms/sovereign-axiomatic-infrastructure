const fused = Fusion.fuse({
  autonomy: { nextTask: 'diagnosis' },
  planning: { steps: [1,2,3,4] },
  execution: { ok: true },
  emergence: { Em: 14.2 },
  diagnostics: { flags: [] },
  performance: { durationMs: 180 },
  global: { updatedAt: Date.now() }
})

const directives = Directives.generateDirectives(fused)
const actionResult = await Actions.execute(directives)

console.log('Action Engine Output:', actionResult)
