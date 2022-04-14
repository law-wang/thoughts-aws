import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Tag {
  THOUGHTS = "THOUGHTS",
  PLAYLISTS = "PLAYLISTS",
  QUOTES = "QUOTES"
}



type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Post {
  readonly id: string;
  readonly time: string;
  readonly content?: string | null;
  readonly tag?: Tag | keyof typeof Tag | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}