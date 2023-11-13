import 'dotenv/config';
import { registerEvents } from './utils';
import events from './events';
import {
  Client,
  GatewayIntentBits,
  VoiceBasedChannel
} from 'discord.js';
import { Player } from 'discord-player';
import { redisClient } from './redis';

const main = async () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates
    ]
  });

  const player = new Player(client, {
    ytdlOptions: {
      quality: 'highestaudio',
      highWaterMark: 1 << 25
    }
  });

  registerEvents(client, player, events);

  await redisClient.connect();

  client.login(process.env.TOKEN).catch((err) => {
    console.error('[Login Error]', err);
    process.exit(1);
  });

  client.on('voiceStateUpdate', (oldState, newState) => {
    if (
      newState.channelId === null &&
      oldState.channelId !== null &&
      oldState.member?.user.id === client.user?.id
    ) {
      console.log('Left voice channel');
      redisClient.del(`scoreboard-${oldState.guild.id}`);
    }
  });

  client.on('voiceStateUpdate', (oldState, newState) => {
    // check if left alone in vc
    if (newState.channelId === null && oldState.channelId !== null) {
      const channel = oldState.guild.channels.cache.get(
        oldState.channelId
      ) as VoiceBasedChannel;
      if (
        Array.from(channel.members).length === 1 &&
        Array.from(channel.members)[0][0] === client.user?.id
      ) {
        // TODO: disconnect from voice channel
      }
    }
  });
};

main();
