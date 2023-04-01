import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { command } from '../utils';

const meta = new SlashCommandBuilder()
  .setName('skip')
  .setDescription('Skip to next opening.');

export default command(meta, async ({ interaction }) =>{
    const queue = useQueue(interaction.guild!.id);
    if (!queue) {
        return interaction.reply({ content: 'I am **not** in a voice channel', ephemeral: true });
    }
    if (!queue.currentTrack) {
        return interaction.reply({ content: 'There is no track **currently** playing', ephemeral: true });
    }
    queue.node.skip();
    return interaction.reply({
        content: `⏩ | I have **skipped** to the next track`
    });
});
