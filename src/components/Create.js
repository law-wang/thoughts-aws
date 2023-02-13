import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { DataStore } from '@aws-amplify/datastore';
import { Storage } from '@aws-amplify/storage';

import { Tag, Post } from '../models';
import '../style.css';

function Create({ user }) {
  const {
    register: registerPost,
    handleSubmit: handleSubmitPost,
    reset: resetPost,
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
  const [audio, setAudio] = useState('');
  const onSubmitAudio = async (e) => {
    e.preventDefault();
    const file = audioSubmissionRef.current.files[0];

    // put our file in storage, use the file's name as its S3 Key
    await Storage.put(file.name, file)
      .then((item) => {
        console.log(item);
      })
      .catch((err) => console.error(err));
    setAudio('');
  };

  return user ? (
    <div id="post-create">
      <form onSubmit={handleSubmitPost(onSubmitPost)}>
        Add New Post:
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
        <div>
          <input
            id="quotes"
            {...registerPost('Tag', { required: true })}
            type="radio"
            value={Tag.AUDIO}
          />
          <label htmlFor="quotes">Audio</label>
        </div>
        <input type="submit" />
      </form>

      <form onSubmit={onSubmitAudio}>
        Add New Audio:
        <input
          type="file"
          accept=".mp3, .m4a"
          ref={audioSubmissionRef}
          required={true}
          value={audio}
          onChange={(e) => setAudio(e.target.value)}
        />
        <button className="preserve-button" style={{ marginTop: '10px' }}>
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div id="post-create">
      Access Denied. You need to <a href="/login">log in</a> first.
    </div>
  );
}

export default Create;
