import { useQueue } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { command } from '../utils';
import { getScoreboardId } from '../utils/id';
import { getVoiceChannelUsers } from '../utils/getVoiceChannelUsers';
import { redisClient } from '../redis';
import { formatScoreboard } from '../utils/formatScoreboard';
import { Opening } from '../types/opening';

const meta = new SlashCommandBuilder()
  .setName('guess')
  .setDescription('Guess the anime from the OP or ED currently playing.')
  .addStringOption((option) =>
    option
      .setName('anime')
      .setDescription('Provide your best guess.')
      .setMinLength(1)
      .setMaxLength(200)
      .setRequired(true)
  );

export default command(meta, async ({ interaction }) => {
  const member = interaction.guild?.members.cache.get(
    interaction.member?.user.id ?? ''
  );
  if (!member?.voice.channel) {
    return interaction.reply('You need to be in a VC to use this command');
  }

  const queue = useQueue(interaction.guild!.id);
  if (!queue) {
    return interaction.reply({
      content: 'I am **not** in a voice channel',
      ephemeral: true
    });
  }
  if (!queue.currentTrack) {
    return interaction.reply({
      content: 'There is no track **currently** playing',
      ephemeral: true
    });
  }

  const keywords = (
    Object.values(
      (queue.currentTrack.raw as unknown as Opening).keywords
    ).filter((e) => e) as string[]
  ).map((e) => e.toLocaleLowerCase());
  const anime =
    interaction.options.getString('anime')?.toLocaleLowerCase() ?? '';
  if (keywords.includes(anime)) {
    queue.node.skip();
    const users = getVoiceChannelUsers(member.voice.channel);
    const cachedUserMap = await redisClient.hGetAll(
      `scoreboard-${interaction.guild!.id}`
    );
    const missingUserMap = users
      .filter((user) => !Object.keys(cachedUserMap).includes(user.id))
      .reduce((acc, user) => {
        acc[user.id] = 0;
        return acc;
      }, {} as Record<string, number>);
    const newUserMap = {
      ...cachedUserMap,
      ...missingUserMap,
      [member.user.id]: Number(cachedUserMap[member.user.id] ?? 0) + 1
    };
    redisClient.hSet(getScoreboardId(interaction.guild!.id), newUserMap);
    let scoreboardText = formatScoreboard(newUserMap);
    return interaction.reply({
      content: `Correct <@${interaction.user.id}>!\n${scoreboardText}`
    });
  } else {
    return interaction.reply({
      content: 'Wrong!'
    });
  }
});
