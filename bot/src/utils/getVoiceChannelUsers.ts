import { GuildMember, User, VoiceBasedChannel } from 'discord.js';

export const getVoiceChannelUsers = (channel: VoiceBasedChannel): User[] => {
  return Array.from(channel.members)
    .flat()
    .filter((e) => e instanceof GuildMember)
    .map((e) => (e as GuildMember).user)
    .filter((e) => !e.bot);
};
