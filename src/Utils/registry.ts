import Bot from './Bot';
import { readdirSync } from 'fs';
import { resolve, sep } from 'path';
const commandDir = resolve(`${process.cwd()}${sep}src${sep}commands`);
const eventDir = resolve(`${process.cwd()}${sep}src${sep}events`);
const langDir = resolve(`${process.cwd()}${sep}src${sep}lang`);

export default function register(bot: Bot) {
  registerCommands(bot);
  registerEvents(bot);
  registerLangs(bot);
}

const registerCommands = (bot: Bot): void => {
  const commands = readdirSync(`${commandDir}${sep}`).filter(files => files.endsWith('.ts'));

  for (const file of commands) {
    try {
      const command = require(`${commandDir}${sep}${file}`)?.default;
      if (!command) continue;
      bot.commands.set(command.name, command);
    } catch (e) {
      console.error(e);
    }
  }
}

const registerEvents = (bot: Bot): void => {
  const events = readdirSync(`${eventDir}${sep}`).filter(files => files.endsWith('.ts'));

  for (const file of events) {
    try {
      const event = require(`${eventDir}${sep}${file}`)?.default;
      if (!event) continue;
      bot.events.set(event.name, event);
      bot.client.on(event.name, event.run.bind(null, bot));
    } catch (e) {
      console.error(e);
    }
  }
}

const registerLangs = (bot: Bot): void => {
  const langs = readdirSync(langDir).filter(file => file.endsWith('.json'));

  for (const file of langs) {
    try {
      const lang = require(`${langDir}${sep}${file}`);
      bot.langs.set(file.split('.json')[0], lang);
    } catch (e) {
      console.error(e);
    }
  }
}