import Bot from '../Utils/Bot';
import Youtube from 'youtube-sr';
const ytdl = require('ytdl-core');

export default {
  name: 'ready',
  async run (bot: Bot) {
    const searched = await Youtube.getVideo('https://www.youtube.com/watch?v=5qap5aO4i9A');
    bot.video = searched;
    bot.owner = bot.client.users.cache.get('764213893815468042');
    console.log('Client is ready');
    console.log(`Logged in as ${bot.client.user.tag}`);
    console.log(`Serving ${bot.client.guilds.cache.map((g) => g.members.cache.size).reduce((a, b) => a + b)} users in ${bot.client.guilds.cache.size} guilds`);
    bot.client.user.setActivity({
      type: 'LISTENING',
      name: bot.video.title
    });
    setInterval(() => {
      bot.client.voice.connections.forEach(c => c.play(ytdl('https://www.youtube.com/watch?v=5qap5aO4i9A')));
    }, 21600000);
  }
}