import React, { useState, useEffect, useRef } from 'react';
import {
  LoginForm,
  Blog,
  CreateBlogForm,
  ErrorNotification,
  SuccessNotification,
  Togglable,
} from './components';
import { replaceAt } from './utils';

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
      blogService.setToken(user.token);
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
      const blogsWithUsers = await blogService.getAll();
      setBlogs(blogsWithUsers);
      setupNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author}`
      );
    } catch(e) {
      setupError('Creation unsuccessful. Try again!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBlogListUser');
  };

  const handleLikeClick = async (blogData) => {
    try {
      const returnedBlog = await blogService.incrementLike(blogData);
      const index = blogs.findIndex((blog) => blog.id === returnedBlog.id);
      const returnedBlogWithUser = { ...returnedBlog, user: blogData.user };
      setBlogs(replaceAt(blogs, index, returnedBlogWithUser));
    } catch(e) {
      setupError('Update unsuccessful. Try again!');
    }
  };

  const handleDelete = async (blog) => {
    const result = window.confirm(
      `Remove ${blog.title} by ${blog.user.username}`
    );
    if (result === false) return;
    await blogService.removeBlog(blog.id);
    setBlogs(blogs.filter((b) => b.id !== blog.id));
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
      {!!blogs.length &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikeClick={handleLikeClick}
              handleDelete={handleDelete}
              userCreatedBlog={user.username === blog.user.username}
            />
          ))}
    </div>
  );
};

export default App;
