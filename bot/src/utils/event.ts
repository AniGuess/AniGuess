import { Event, EventExec, EventKeys } from '../types'
import { Client, Events } from 'discord.js'

export function event<T extends EventKeys>(id: T, exec: EventExec<T>, once: boolean = false): Event<T> {
  return { id, exec, once };
}

export function registerEvents(client: Client, events: Event<any>[]): void {
  for (const event of events) {
    if(event.once) {
      client.once(event.id, event.exec.bind(null, {
        client,
        log: (...args) => console.log(`[${event.id}]`, ...args),
      }));
    } else {
      client.on(event.id, event.exec.bind(null, {
        client,
        log: (...args) => console.log(`[${event.id}]`, ...args),
      }));
    }
  }
}
