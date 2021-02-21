import { Message } from 'discord.js';
import Bot from './Bot';
import langOption from './langs';

export interface commandOption {
  name: string,
  aliases: string[];
  run(bot: Bot, message: Message, args: string[], lang: langOption, settings: guildSettings): Promise<void>;
}

export interface eventOption {
  name: string,
  run(bot: Bot, ...args: any): Promise<void>;
}

export interface configOption {
  default: configDefaultOption;
}

interface configDefaultOption {
  prefix: string;
  lang: string;
}

export interface db {
  getGuild(guildId: string): Promise<any>;
  updateGuild(guildId: string, options: guildSchemaOptions): Promise<any>;
  deleteGuild(guildId: string): Promise<void>;
  createGuild(guildId: string): Promise<any>;
}

interface guildSettings {
  _id: string;
  prefix: string;
  channel: string;
  lang: string;
}

interface guildSchemaOptions {
  prefix?: string;
  channel?: string;
  lang?: string;
}