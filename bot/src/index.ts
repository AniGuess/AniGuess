import 'dotenv/config';
import { registerEvents } from './utils';
import events from './events';
import { Client, GatewayIntentBits } from 'discord.js';
import keys from './keys';


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

registerEvents(client, events);

client.login(keys.token).catch((err) => {
  console.error('[Login Error]', err);
  process.exit(1);
});
