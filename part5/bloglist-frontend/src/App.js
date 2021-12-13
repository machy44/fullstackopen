import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { LoginForm } from './components/LoginForm';
import { CreateBlogForm } from './components/CreateBlogForm';
import {
  ErrorNotification,
  SuccessNotification,
} from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const setupError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInBlogListUser', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      setupError('Wrong username or password');
    }
  };

  const handleCreate = async (event, blogData) => {
    event.preventDefault();
    try {
      const returnedBlog = await blogService.create(blogData);
      setBlogs(blogs.concat(returnedBlog));
      setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author}`
      );
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch {
      setupError('Creation unsuccessful. Try again!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBlogListUser');
  };

  if (user === null) {
    return (
      <>
        {errorMessage && <ErrorNotification message={errorMessage} />}
        <LoginForm handleSubmit={handleLogin} />;
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <SuccessNotification message={notification} />}
      {errorMessage && <ErrorNotification message={errorMessage} />}
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
