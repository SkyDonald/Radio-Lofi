import { Client, ClientOptions, Collection, User } from 'discord.js';
require('dotenv').config();
import Util from './Util';
import GuildSettings from './../models/guild';
import register from './registry';
import { Video } from 'youtube-sr';
import { db, configOption, commandOption, eventOption } from './Bot.d';
import langOption from './langs.d';
import UtilInterface from './Util.d';
import { connect } from 'mongoose';

export default class Bot {
  config: configOption;
  env: typeof process.env;
  util: UtilInterface;
  db: db;
  video: Video;
  owner: User;
  client: Client;
  commands: Collection<string, commandOption>;
  events: Collection<string, eventOption>;
  langs: Collection<string, langOption>;

  constructor(clientOptions?: ClientOptions) {
    this.commands = new Collection();
    this.events = new Collection();
    this.langs = new Collection();
    this.config = require('./../../config');
    this.env = process.env;
    this.util = Util;
    this.client = new Client(clientOptions);
    this.db = {
      async getGuild (guildId) {
        const data = await GuildSettings.findOne({ _id: guildId }).catch((err) => console.error(err));
        if (data) return data;
        else return undefined;
      },
      async updateGuild (guildId, options) {
        await GuildSettings.updateOne(
          { _id: guildId },
          { $set: options }
        ).then(() => {}).catch((err) => console.error(err));
        return await GuildSettings.findOne({ _id: guildId });
      },
      async deleteGuild (guildId) {
        return await GuildSettings.deleteOne({ _id: guildId }).catch((err) => console.error(err));
      },
      async createGuild (guildId) {
        const newGuildSettings = new GuildSettings({
          _id: guildId
        });
        await newGuildSettings.save().catch((err) => console.error(err));
        const gSettings = await GuildSettings.findOne({
          _id: guildId
        });
        return gSettings;
      }
    };
    register(this);
    this.client.login(this.env.DISCORD_TOKEN);
    connect(this.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}