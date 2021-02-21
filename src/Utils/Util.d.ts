import { DMChannel, NewsChannel, TextChannel } from 'discord.js';
import langOption from './langs.d';

export default interface UtilInterface {
  sendError(text: string, channel: TextChannel | DMChannel | NewsChannel, lang: langOption): Promise<void>;
  basUsage(text: string, channel: TextChannel | DMChannel | NewsChannel, lang: langOption): Promise<void>;
}