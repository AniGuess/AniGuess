import { Event, EventExec, EventKeys } from '../types';
import { Client, Events } from 'discord.js';

export function event<T extends EventKeys>(id: T, exec: EventExec<T>, once: boolean = false): Event<T> {
  return { id, exec, once };
}

export function registerEvents(client: Client, events: Event<any>[]): void {
  for (const event of events) {
    if(event.once) {
      client.once(event.id, async (...args) => {
        const props = {
          client,
          log: (...args: unknown[]) => console.log(`[${event.id}]`, ...args), 
        };
        try {
          await event.exec(props, ...args);
        } catch (error) {
          props.log('Uncaught Error', error);
        }
      });
    } else {
      client.on(event.id, async (...args) => {
        const props = {
          client,
          log: (...args: unknown[]) => console.log(`[${event.id}]`, ...args),
        };
        try {
          await event.exec(props, ...args);
        } catch (error) {
          props.log('Uncaught Error', error);
        }
      });
    }
  }
}
