/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { Togglable } from './components';
import { LoginForm } from './login/components';
import { CreateBlogForm } from './blog/components';
import { ErrorNotification, SuccessNotification } from './notification/components';
import { Navigation } from './Navigation';
import { Users } from './user/components/Users';
import { User } from './user/components/User';
import { useGetBlogsQuery, useCreateBlogMutation } from './blog/services/blogs';

import { useLogin } from './login/hooks';
import { useSelector } from 'react-redux';
import { selectSuccessNotification, selectErrorNotification } from './notification/redux/notificationSlice';
import { Routes, Route } from 'react-router-dom';
import { BlogsManager } from 'blog/components';

const App = () => {
  const notificationSuccess = useSelector(selectSuccessNotification);
  const error = useSelector(selectErrorNotification);
  const { data: blogs, isLoading: isLoadingBlogs } = useGetBlogsQuery();
  const [createBlog, result] = useCreateBlogMutation();

  const { handleLogin, isLoading, user, handleLogout } = useLogin();

  const blogFormRef = useRef();

  const handleCreate = async (event, blogData) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    createBlog(blogData);
  };

  if (user === null) {
    return (
      <>
        {error && <ErrorNotification message={error} />}
        <LoginForm handleSubmit={handleLogin} />
      </>
    );
  }

  if (isLoadingBlogs) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Navigation />
      <h2 className="text-3xl font-bold underline">blogs</h2>
      <SuccessNotification message={notificationSuccess} />
      {error && <ErrorNotification message={error} />}
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateBlogForm handleSubmit={handleCreate} />
      </Togglable>
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
        <Route path="blogs/*" element={<BlogsManager blogs={blogs} user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
