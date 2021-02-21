import { Message, MessageEmbed } from 'discord.js';
import Bot from '../Utils/Bot';

export default {
  name: 'message',
  async run (bot: Bot, message: Message) {
    const { author, guild, content, channel } = message;
    if (author.bot) return;
    if (channel.type === 'dm') return bot.client.emit('directMessage', bot, message);

    let settings = await bot.db.getGuild(guild.id);
    if (!settings) settings = await bot.db.createGuild(guild.id);
    const lang = bot.langs.get(settings.lang || bot.config.default.prefix);
    const prefixMention = new RegExp(`^<@!?${bot.client.user.id}>`);
    if (content.match(prefixMention)) {
      const embed = new MessageEmbed()
        .setTitle(lang.util['my-prefix-is'].replace('{PREFIX}', settings.prefix))
        .setColor('BLUE')
        .setFooter(bot.client.user.username, bot.client.user.displayAvatarURL({ dynamic: true }));

      return await message.channel.send(embed);
    }

    const args = content.slice(settings.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    let command = bot.commands.get(commandName);
    if (!command) command = bot.commands.find(c => c.aliases.includes(commandName));
    if (!command) return;
    try {
      command.run(bot, message, args, lang, settings);
    } catch (e) {
      console.error(e);
      bot.util.sendError(`${message.content}\n\`${e}\``, await bot.owner.createDM(), lang);
      bot.util.sendError(lang.util['err-execute-command'], message.channel, lang);
    }
  }
}