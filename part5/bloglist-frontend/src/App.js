import React, { useState, useEffect, useRef } from 'react';
import {
  LoginForm,
  Blog,
  CreateBlogForm,
  ErrorNotification,
  SuccessNotification,
  Togglable,
} from './components';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const blogFormRef = useRef();

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

  const setupNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event, username, password) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInBlogListUser', JSON.stringify(user));
      loginService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setupError('Wrong username or password');
    }
  };

  const handleCreate = async (event, blogData) => {
    event.preventDefault();
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogData);
      setBlogs(blogs.concat(returnedBlog));
      setupNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author}`
      );
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
        <LoginForm handleSubmit={handleLogin} />
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
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateBlogForm handleSubmit={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;