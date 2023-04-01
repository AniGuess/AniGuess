import { Command } from '../types';
import ping from './ping';
import play from './play';
import skip from './skip';
import guess from './guess';

const commands: Command[] = [
  ping,
  play,
  skip,
  guess,
];

export default commands;
