import { Track, useQueue } from 'discord-player';
import { GuildMember, SlashCommandBuilder } from 'discord.js';
import { openings } from '../models/opening';
import { score, Score } from '../models/score';
import { command } from '../utils';

const meta = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Start playing a game.');

export default command(meta, async ({ interaction, player }) =>{
    const member = interaction.guild?.members.cache.get(interaction.member?.user.id ?? '');
    if (!member?.voice.channel) return interaction.reply("You need to be in a VC to use this command");

    const queue = useQueue(interaction.guild!.id);
    if (queue) {
        return interaction.reply({ content: 'The game has already started', ephemeral: true });
    }

    const playlist = await player.createPlaylist({
        tracks: openings.map((opening) => new Track(
            player, 
            {
                title: opening.title,
                description: 'this is the description',
                author: 'Author',
                url: opening.youtubeUrl,
                thumbnail: opening.imageUrl,
                duration: '03:00',
                views: 150,
                raw: opening.keywords,
            },
        )).sort(() => Math.random() - .5),
        title: 'Title',
        description: 'Description',
        thumbnail: 'Thumbnail',
        type: 'playlist',
        source: 'youtube',
        author: {
            name: 'Author',
            url: 'Author.url',
        },
        id: 'id',
        url: 'url',
    });

    player.play(member.voice.channel.id, playlist);
    const users = Array.from(member.voice.channel.members).flat().filter((e) =>  e instanceof GuildMember).map((e) => (e as GuildMember).user).filter((e) => !e.bot);
    score.splice(0);
    score.push(...users.map((u) => new Score(u, 0)));
    let scoreBoard = "Score Board:\n";
    for(let i = 0; i < score.length; i++) {
        scoreBoard += `${i+1} | Score: ${score[i].score} | ${score[i].user.username}#${score[i].user.discriminator}\n`;
    }
    return interaction.reply(`Game stared!\n${scoreBoard}`);
});
