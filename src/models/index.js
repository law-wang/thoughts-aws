// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Tag = {
  "PLAYLISTS": "PLAYLISTS",
  "THOUGHTS": "THOUGHTS",
  "QUOTES": "QUOTES"
};

const { Blog, Post } = initSchema(schema);

export {
  Blog,
  Post,
  Tag
};