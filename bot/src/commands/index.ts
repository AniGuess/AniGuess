import { Command } from '../types';
import ping from './ping';
import play from './play';
import skip from './skip';

const commands: Command[] = [
  ping,
  play,
  skip,
];

export default commands;
