export const addTimestamp = (note) => ({
  ...note,
  time: new Date().toLocaleTimeString()
})

export const normalizeSeverity = (note) => ({
  ...note,
  type: note.type || 'info'
})
