import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { LoginForm } from './components/LoginForm';
import { CreateBlogForm } from './components/CreateBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogListUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
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

  const handleCreate = async (event, blogData) => {
    event.preventDefault();
    const returnedBlog = await blogService.create(blogData);
    setBlogs(blogs.concat(returnedBlog));
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
      <CreateBlogForm handleSubmit={handleCreate} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
