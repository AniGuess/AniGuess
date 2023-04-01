import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { score } from '../models/score';
import { command } from '../utils';

const meta = new SlashCommandBuilder()
  .setName('guess')
  .setDescription('Guess the anime from the OP or ED currently playing.')
  .addStringOption((option) => option
    .setName('anime')
    .setDescription('Provide your best guess.')
    .setMinLength(1)
    .setMaxLength(200)
    .setRequired(true)
  );
  

export default command(meta, async ({ interaction }) =>{
    const queue = useQueue(interaction.guild!.id);
    if (!queue) {
        return interaction.reply({ content: 'I am **not** in a voice channel', ephemeral: true });
    }
    if (!queue.currentTrack) {
        return interaction.reply({ content: 'There is no track **currently** playing', ephemeral: true });
    }
    
    const keywords = (Object.values(queue.currentTrack.raw).filter((e) => e) as string[]).map((e) => e.toLocaleLowerCase());
    const anime = interaction.options.getString('anime')?.toLocaleLowerCase() ?? '';
    if(keywords.includes(anime)) {
        queue.node.skip();
        score.find((e) => e.user.id === interaction.user.id)!.score++;
        score.sort((a, b) => a.score - b.score);
        let scoreBoard = "Score Board:\n";
        for(let i = 0; i < score.length; i++) {
            scoreBoard += `${i+1} | Score: ${score[i].score} | ${score[i].user.username}#${score[i].user.discriminator}\n`;
        }
        return interaction.reply({
            content: `Correct ${interaction.user.username}#${interaction.user.discriminator}!\n${scoreBoard}`,
        });
    } else {
        return interaction.reply({
            content: 'Wrong!'
        });
    }
});
