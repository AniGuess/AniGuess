import { Events } from 'discord.js';
import { event } from '../utils';

export default event(Events.ClientReady, ({ log }, client) => {
  log(`Logged in as ${client.user.tag}`);
}, true);
