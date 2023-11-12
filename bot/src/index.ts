import 'dotenv/config';
import { registerEvents } from './utils';
import events from './events';
import { Client, GatewayIntentBits } from 'discord.js';
import { Player } from 'discord-player';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  }
});

registerEvents(client, player, events);

client.login(process.env.TOKEN).catch((err) => {
  console.error('[Login Error]', err);
  process.exit(1);
});


client.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.channelId === null && oldState.channelId !== null && oldState.member?.user.id === client.user?.id) {
    console.log('Left voice channel')
    // TODO: clear scoreboard
  }
})
