/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Togglable } from './components';
import { LoginForm } from './login/components';
import { Blog, CreateBlogForm } from './blog/components';
import { ErrorNotification, SuccessNotification } from './notification/components';
import { useGetBlogsQuery, useCreateBlogMutation, useIncrementLikeMutation } from './blog/services/blogs';

import blogService from './blog/services/blogs';
import { useLogin } from './login/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectSuccessNotification, selectErrorNotification } from './notification/redux/notificationSlice';

const App = () => {
  const notificationSuccess = useSelector(selectSuccessNotification);
  const error = useSelector(selectErrorNotification);
  const { data: blogs, isLoading: isLoadingBlogs } = useGetBlogsQuery();
  const [createBlog, result] = useCreateBlogMutation();
  const { handleLogin, isLoading, user, handleLogout } = useLogin();
  const [updateLike] = useIncrementLikeMutation();
  const blogFormRef = useRef();

  const handleCreate = async (event, blogData) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    createBlog(blogData);
  };

  const handleLikeClick = async (blogData) => {
    updateLike(blogData);
  };

  const handleDelete = async (blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.user.username}`);
    if (result === false) return;
    await blogService.removeBlog(blog.id);
    // setBlogs(blogs.filter((b) => b.id !== blog.id));
  };

  console.log({ error });

  if (user === null) {
    return (
      <>
        {error && <ErrorNotification message={error} />}
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
      {error && <ErrorNotification message={error} />}
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
