import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataStore } from '@aws-amplify/datastore';

import { Tag, Post } from '../models';
import '../style.css';
import { Storage } from '@aws-amplify/storage';

function Create({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const newPost = await DataStore.save(
      new Post({
        content: data.Content,
        tag: data.Tag,
        time: new Date().toISOString(),
      })
    );

    reset();
  };
  console.log(errors);

  // await Storage.put("test.txt", "Hello");

  return user ? (
    <div id="post-create">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          type="text"
          rows="5"
          placeholder="Content"
          {...register('Content', { required: true })}
        />

        <div>
          <input
            id="thoughts"
            {...register('Tag', { required: true })}
            type="radio"
            value={Tag.THOUGHTS}
          />
          <label for="thoughts">Thoughts</label>
        </div>

        <div>
          <input
            id="playlists"
            {...register('Tag', { required: true })}
            type="radio"
            value={Tag.PLAYLISTS}
          />
          <label for="playlists">Playlists</label>
        </div>

        <div>
          <input
            id="quotes"
            {...register('Tag', { required: true })}
            type="radio"
            value={Tag.QUOTES}
          />
          <label for="quotes">Quotes</label>
        </div>

        <input type="submit" />
      </form>
    </div>
  ) : (
    <div id="post-create">Access Denied.</div>
  );
}

export default Create;
