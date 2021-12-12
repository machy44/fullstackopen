import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

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
        <label for="name">username</label>
        <input
          id="name"
          name="name"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <label for="password">password</label>
        <input
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </form>
    </>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (user === null) {
    return <LoginForm handleSubmit={handleLogin} />;
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
