import { ClientEvents, Awaitable, Client } from 'discord.js'

type LoggerFunction = (...args: unknown[]) => void;

export type EventKeys = keyof ClientEvents;

export type EventExec<T extends EventKeys> =
  (props: EventProps, ...args: ClientEvents[T]) => Awaitable<unknown>;

export interface EventProps {
  client: Client
  log: LoggerFunction
}

export interface Event<T extends EventKeys> {
  id: T,
  exec: EventExec<T>,
  once: boolean,
}
