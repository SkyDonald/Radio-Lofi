import { Message } from 'discord.js';
import langOption from '../Utils/langs';
import Bot from './../Utils/Bot';
import { guildSettings } from './../Utils/Bot.d';

export default {
  name: 'join',
  aliases: ['play', 'lofi'],
  async run (bot: Bot, message: Message, args: string[], lang: langOption, settings: guildSettings) {
    const { channel } = message.member.voice;
    if (!channel) return bot.util.sendError(lang.commands['no-voc-channel'], message.channel, lang);
    await play();

    async function play () {
      try {
        const connection = await channel.join();
        message.guild.voice.setSelfDeaf(true);
        connection
          .play(bot.stream)
          .on('finish', () => play())
          .on('error', (err) => {
            console.error(err);
            bot.util.sendError(lang.util['err-execute-command'], message.channel, lang);
          });
      } catch (err) {
        console.error(err);
        bot.util.sendError(lang.util['err-execute-command'], message.channel, lang);
      }
    }
  }
}