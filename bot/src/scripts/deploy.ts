import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '..', '..', '.env') })

import { REST, Routes, APIUser } from 'discord.js';
import commands from '../commands';

const body = commands.map(({ meta }) => meta).flat();

const token = process.env.TOKEN ?? '';
const testGuild = process.env.TEST_GUILD ?? '';

const rest = new REST({ version: '10' }).setToken(token);

async function main() {
  const currentUser = await rest.get(Routes.user()) as APIUser;

  const endpoint = process.env.NODE_ENV === 'production'
    ? Routes.applicationCommands(currentUser.id)
    : Routes.applicationGuildCommands(currentUser.id, testGuild);

  await rest.put(endpoint, { body });

  return currentUser;
}

main().then((user) => {
  const tag = `${user.username}#${user.discriminator}`;
  const response = process.env.NODE_ENV === 'production'
    ? `Successfully released commands in production as ${tag}!`
    : `Successfully registered commands for development in ${testGuild} as ${tag}!`;
  console.log(response);
}).catch(console.error);
