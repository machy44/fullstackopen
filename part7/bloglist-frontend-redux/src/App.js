/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Togglable } from './components';
import { LoginForm } from './login/components';
import { Blog, CreateBlogForm } from './blog/components';
import { ErrorNotification, SuccessNotification } from './notification/components';
import { fetchBlogs, selectBlogs, createBlog } from './blog/redux/blogReducer';
import { replaceAt } from './utils';

import blogService from './blog/services/blogs';
import loginService from './login/services/login';
import { useDispatch, useSelector } from 'react-redux';
import { selectSuccessNotification } from './notification/redux/notificationReducer';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const notificationSuccess = useSelector(selectSuccessNotification);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const blogFormRef = useRef();

  console.log(blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
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
      dispatch(createBlog(blogData));
      // setupNotification(`a new blog ${blogData.title} by ${blogData.author}`);
    } catch (e) {
      setupError('Creation unsuccessful. Try again!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBlogListUser');
  };

  const handleLikeClick = async (blogData) => {
    try {
      // const returnedBlog = await blogService.incrementLike(blogData);
      // const index = blogs.findIndex((blog) => blog.id === returnedBlog.id);
      // const returnedBlogWithUser = { ...returnedBlog, user: blogData.user };
      // setBlogs(replaceAt(blogs, index, returnedBlogWithUser));
    } catch (e) {
      setupError('Update unsuccessful. Try again!');
    }
  };

  const handleDelete = async (blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.user.username}`);
    if (result === false) return;
    await blogService.removeBlog(blog.id);
    // setBlogs(blogs.filter((b) => b.id !== blog.id));
  };

  if (user === null) {
    return (
      <>
        {errorMessage && <ErrorNotification message={errorMessage} />}
        <LoginForm handleSubmit={handleLogin} />
      </>
    );
  }

  const sortByLikes = (a, b) => {
    return b.likes - a.likes;
  };

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={notificationSuccess} />
      {errorMessage && <ErrorNotification message={errorMessage} />}
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateBlogForm handleSubmit={handleCreate} />
      </Togglable>
      {!!blogs.length &&
        [...blogs]
          .sort(sortByLikes)
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
