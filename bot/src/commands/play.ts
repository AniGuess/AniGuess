import { Track } from 'discord-player';
import { SlashCommandBuilder } from 'discord.js';
import { openings } from '../models/opening';
import { command } from '../utils';

const meta = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Start playing a game.');

export default command(meta, async ({ interaction, player }) =>{
    const member = interaction.guild?.members.cache.get(interaction.member?.user.id ?? '');
    if (!member?.voice.channel) return interaction.reply("You need to be in a VC to use this command");

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
            }
        )),
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
    return interaction.reply("Game stared");
});
