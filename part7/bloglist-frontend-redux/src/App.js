/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Togglable } from './components';
import { LoginForm } from './login/components';
import { Blog, CreateBlogForm } from './blog/components';
import { ErrorNotification, SuccessNotification } from './notification/components';
import { replaceAt } from './utils';
import { useGetBlogsQuery, useCreateBlogMutation } from './blog/services/blogs';

import blogService from './blog/services/blogs';
import { useLogin } from './login/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectSuccessNotification } from './notification/redux/notificationReducer';

const App = () => {
  const dispatch = useDispatch();

  const notificationSuccess = useSelector(selectSuccessNotification);
  const { data: blogs, error, isLoading: isLoadingBlogs } = useGetBlogsQuery();
  const [createBlog, result] = useCreateBlogMutation();
  const { handleLogin, isLoading, user, handleLogout } = useLogin();
  const [errorMessage, setErrorMessage] = useState(null);
  const blogFormRef = useRef();

  const setupError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
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

  if (isLoadingBlogs) {
    return <div>loading ...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold underline">blogs</h2>
      <SuccessNotification message={notificationSuccess} />
      {errorMessage && <ErrorNotification message={errorMessage} />}
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateBlogForm handleSubmit={handleCreate} />
      </Togglable>
      {[...blogs].sort(sortByLikes).map((blog) => (
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
