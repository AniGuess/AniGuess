import 'dotenv/config';
import {
  Client,
  GatewayIntentBits,
} from 'discord.js';
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const token = process.env.TOKEN;

console.log('Bot is starting...');
client.on('ready', () => {
  console.log('Bot is running!');
});

client.login(token);
