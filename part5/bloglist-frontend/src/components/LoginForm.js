import React, { useState } from 'react';

export const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    handleSubmit(e, username, password);
    setUsername('');
    setPassword('');
  };
  return (
    <>
      <h1>login to application</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label for="name">username: </label>
          <input
            id="name"
            name="name"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label for="password">password: </label>
          <input
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};
