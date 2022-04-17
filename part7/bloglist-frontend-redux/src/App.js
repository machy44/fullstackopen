/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { Togglable, Navigation, NotExists } from './components';
import { LoginForm } from './login/components';
import { CreateBlogForm } from './blog/components';
import { ErrorNotification, SuccessNotification } from './notification/components';
import { Users } from './user/components/Users';
import { User } from './user/components/User';
import { useGetBlogsQuery, useCreateBlogMutation } from './blog/services/blogs';

import { useLogin } from './login/hooks';
import { useSelector } from 'react-redux';
import { selectSuccessNotification, selectErrorNotification } from './notification/redux/notificationSlice';
import { Routes, Route, Outlet } from 'react-router-dom';
import { BlogsManager } from 'blog/components';

const Layout = ({ error, handleLogout, userName }) => {
  const notificationSuccess = useSelector(selectSuccessNotification);
  const [createBlog, result] = useCreateBlogMutation();
  const blogFormRef = useRef();

  const handleCreate = async (event, blogData, userName) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    createBlog(blogData);
  };
  return (
    <div>
      <Navigation userName={userName} handleClick={handleLogout} />
      <h2 className="text-3xl font-bold">blog app</h2>
      <SuccessNotification message={notificationSuccess} />
      {error && <ErrorNotification message={error} />}
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateBlogForm handleSubmit={handleCreate} />
      </Togglable>
      <Outlet />
    </div>
  );
};

const App = () => {
  const error = useSelector(selectErrorNotification);
  const { data: blogs, isLoading: isLoadingBlogs } = useGetBlogsQuery();

  const { handleLogin, isLoading, user, handleLogout } = useLogin();

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
    <Routes>
      <Route element={<Layout error={error} handleLogout={handleLogout} userName={user.name} />}>
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
        <Route index element={<BlogsManager blogs={blogs} user={user} />} />
        <Route path="blogs/*" element={<BlogsManager blogs={blogs} user={user} />} />
        <Route path="*" element={<NotExists />} />
      </Route>
    </Routes>
  );
};

export default App;
