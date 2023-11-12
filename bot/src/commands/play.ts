import { Track, useQueue } from 'discord-player';
import { GuildMember, SlashCommandBuilder } from 'discord.js';
import { command } from '../utils';
import { getOpenings } from '../api/getOpenings';

const meta = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Start playing a game.');

export default command(meta, async ({ interaction, player }) => {
  const member = interaction.guild?.members.cache.get(
    interaction.member?.user.id ?? ''
  );
  if (!member?.voice.channel)
    return interaction.reply('You need to be in a VC to use this command');

  const queue = useQueue(interaction.guild!.id);
  if (queue) {
    return interaction.reply({
      content: 'The game has already started',
      ephemeral: true
    });
  }

  const openings = await getOpenings({ limit: 10 });

  const playlist = player.createPlaylist({
    tracks: openings
      .map(
        (opening) =>
          new Track(player, {
            title: opening.title,
            description: 'N/A',
            author: 'N/A',
            url: opening.youtubeUrl,
            thumbnail: opening.imageUrl,
            duration: 'N/A',
            views: 0,
            raw: opening
          })
      )
      .sort(() => Math.random() - 0.5),
    title: 'Anime Openings',
    description: 'Anime Openings',
    thumbnail: 'N/A',
    type: 'playlist',
    source: 'youtube',
    author: {
      name: 'N/A',
      url: 'N/A'
    },
    id: `aniguess-${interaction.guild!.id}`,
    url: 'N/A'
  });

  player.play(member.voice.channel.id, playlist);
  // const users = Array.from(member.voice.channel.members)
  //   .flat()
  //   .filter((e) => e instanceof GuildMember)
  //   .map((e) => (e as GuildMember).user)
  //   .filter((e) => !e.bot);
  // score.splice(0);
  // score.push(...users.map((u) => new Score(u, 0)));
  // let scoreBoard = formatScoreboard(score);
  // return interaction.reply(`Game stared!\n${scoreBoard}`);
  return interaction.reply(`Game stared!`);
});
