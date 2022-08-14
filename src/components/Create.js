// import { useEffect, useState } from 'react';
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

  const submitAudio = async (e) => {
    // don't refresh the page on submit
    e.preventDefault();
    // get the file from the file upload element, this will be an array.
    // we only want the first element
    const file = document.getElementById('file-upload').files[0];

    // put our file in storage, use the file's name as its S3 Key
    Storage.put(file.name, file)
      .then((item) => {
        console.log(item);
      })
      .catch((err) => console.error(err));
  };

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

      <form id="upload-form">
        {/* <input type="file" name="filename" id="file-upload" accept=".mp3, .m4a">
        <input type="submit" value="Upload" onSubmit> */}
      </form>
    </div>
  ) : (
    <div id="post-create">
      Access Denied. You need to <a href="/login">log in</a> first.
    </div>
  );
}

export default Create;
