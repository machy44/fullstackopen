import React, { useState } from 'react';

export const CreateBlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const onSubmit = (e) => {
    handleSubmit(e, { title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h1>create New</h1>
      <form onSubmit={onSubmit} data-testid="create-blog-form">
        <div>
          <label htmlFor="title">title: </label>
          <input
            data-testid="title"
            id="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author: </label>
          <input
            data-testid="author"
            id="author"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">url: </label>
          <input data-testid="url" id="url" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button data-testid="new-blog-form-submit" type="submit">
          create
        </button>
      </form>
    </>
  );
};
