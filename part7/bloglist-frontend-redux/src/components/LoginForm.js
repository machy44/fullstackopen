import React, { useState } from 'react';

const LoginForm = ({ handleSubmit }) => {
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
          <label htmlFor="name">username: </label>
          <input
            data-testid="username"
            id="name"
            name="name"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password: </label>
          <input
            data-testid="password"
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button data-testid="submit" type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
