import { EventBus } from '@/engine/EventBus.js'
import { Store } from '@/store/GlobalStore.js'

export const NotificationPipeline = {
  processors: [],

  use(processor) {
    this.processors.push(processor)
  },

  ingest(raw) {
    let note = { ...raw }

    for (const processor of this.processors) {
      note = processor(note)
    }

    this.dispatch(note)
  },

  dispatch(note) {
    Store.addNotification(note)
    EventBus.emit('notify', note)
  }
}
