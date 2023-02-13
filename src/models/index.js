// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Tag = {
  "THOUGHTS": "THOUGHTS",
  "PLAYLISTS": "PLAYLISTS",
  "QUOTES": "QUOTES",
  "AUDIO": "AUDIO"
};

const { Post } = initSchema(schema);

export {
  Post,
  Tag
};