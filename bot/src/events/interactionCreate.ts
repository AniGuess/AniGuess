import { Events } from 'discord.js';
import commands from '../commands';
import { Command } from '../types';
import { EditReply, event, Reply } from '../utils';

const allCommandsMap = new Map<string, Command>(
  commands.map((c) => [c.meta.name, c]),
);

export default event(Events.InteractionCreate, async (
  { log, client, player },  
  interaction,
) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    const commandName = interaction.commandName;
    const command = allCommandsMap.get(commandName);

    if (!command) throw new Error('Command not found...');
    
    await command.exec({
      client,
      player,
      interaction,
      log(...args) {
        log(`[${command.meta.name}]`, ...args)
      },
    });
  } catch (error) {
    log('[Command Error]', error);

    if (interaction.deferred) {
      return interaction.editReply(
        EditReply.error('Something went wrong :(')
      );
    }

    return interaction.reply(
      Reply.error('Something went wrong :(')
    );
  }
});
