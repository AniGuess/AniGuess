import {
  Command,
  CommandExec,
  CommandMeta,
} from '../types';

export function command(meta: CommandMeta, exec: CommandExec): Command {
  return { meta, exec };
}
