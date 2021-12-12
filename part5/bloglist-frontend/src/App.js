import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { LoginForm } from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

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
      window.localStorage.setItem('loggedInBlogListUser', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBlogListUser');
  };

  if (user === null) {
    return <LoginForm handleSubmit={handleLogin} />;
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
