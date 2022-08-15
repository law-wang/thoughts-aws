import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataStore } from '@aws-amplify/datastore';

import { Tag, Post } from '../models';
import '../style.css';
import { Storage } from '@aws-amplify/storage';

function Create({ user }) {
  const {
    register: registerPost,
    handleSubmit: handleSubmitPost,
    reset: resetPost,
  } = useForm();

  const {
    register: registerAudio,
    handleSubmit: handleSubmitAudio,
    reset: resetAudio,
  } = useForm();

  const onSubmitPost = async (data) => {
    console.log(data);

    const newPost = await DataStore.save(
      new Post({
        content: data.Content,
        tag: data.Tag,
        time: new Date().toISOString(),
      })
    );
    console.log(newPost);
    resetPost();
  };

  const audioSubmissionRef = useRef(null);
  const onSubmitAudio = async (e) => {
    e.preventDefault();
    const file = audioSubmissionRef.current.files[0];

    // put our file in storage, use the file's name as its S3 Key
    await Storage.put(file.name, file)
      .then((item) => {
        console.log(item);
      })
      .catch((err) => console.error(err));
  };

  const { setValue } = useForm({
    defaultValues: {
      file: '',
    },
  });
  //   const [file, setFile] = useState(null);
  const onChangeFile = (e) => {
    setValue('file', e.target.files[0]);
    // setFile(e.target.files[0]);
  };

  return user ? (
    <div id="post-create">
      <form onSubmit={handleSubmitPost(onSubmitPost)}>
        <textarea
          type="text"
          rows="5"
          placeholder="Content"
          {...registerPost('Content', { required: true })}
        />

        <div>
          <input
            id="thoughts"
            {...registerPost('Tag', { required: true })}
            type="radio"
            value={Tag.THOUGHTS}
          />
          <label htmlFor="thoughts">Thoughts</label>
        </div>

        <div>
          <input
            id="playlists"
            {...registerPost('Tag', { required: true })}
            type="radio"
            value={Tag.PLAYLISTS}
          />
          <label htmlFor="playlists">Playlists</label>
        </div>

        <div>
          <input
            id="quotes"
            {...registerPost('Tag', { required: true })}
            type="radio"
            value={Tag.QUOTES}
          />
          <label htmlFor="quotes">Quotes</label>
        </div>

        <input type="submit" />
      </form>

      {/* <form onSubmit={handleSubmitAudio(onSubmitAudio)}>
        <input
          {...registerAudio('File', { required: true })}
          type="file"
          accept=".mp3, .m4a"
        />
        <input type="submit" />
      </form> */}

      <form onSubmit={onSubmitAudio}>
        <input
          type="file"
          accept=".mp3, .m4a"
          ref={audioSubmissionRef}
          required={true}
        />
        <button className="preserve-button">Submit</button>
      </form>
    </div>
  ) : (
    <div id="post-create">
      Access Denied. You need to <a href="/login">log in</a> first.
    </div>
  );
}

export default Create;
