import { MessageEmbed } from 'discord.js';

export default class Util {
  static async sendError(text, channel, lang) {
    const embed = new MessageEmbed()
      .setFooter(lang.util['something-went-wrong'])
      .setColor('RED')
      .setTitle(text);
    await channel.send(embed).catch(() => {});
  }

  static async basUsage(text, channel, lang) {
    const embed = new MessageEmbed()
      .setFooter(lang.util['bad-usage'])
      .setColor('ORANGE')
      .setTitle(text);
    await channel.send(embed).catch(() => {});
  }
}