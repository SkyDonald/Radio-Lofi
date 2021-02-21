import { model, Schema } from 'mongoose';
import config from './../../config';

const guildSchema = new Schema({
  _id: { type: String, required: true },
  prefix: { type: String, required: true, default: config.default.prefix },
  channel: { type: String },
  lang: { type: String, default: config.default.lang }
});

export default model('guilds', guildSchema);