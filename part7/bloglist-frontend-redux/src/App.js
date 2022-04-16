/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { Togglable } from './components';
import { LoginForm } from './login/components';
import { Blog, CreateBlogForm } from './blog/components';
import { ErrorNotification, SuccessNotification } from './notification/components';
import { Navigation } from './Navigation';
import { Users } from './user/components/Users';
import { User } from './user/components/User';
import {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useIncrementLikeMutation,
  useRemoveBlogMutation
} from './blog/services/blogs';

import { useLogin } from './login/hooks';
import { useSelector } from 'react-redux';
import { selectSuccessNotification, selectErrorNotification } from './notification/redux/notificationSlice';
import { Routes, Route, useParams, useMatch } from 'react-router-dom';
import { Blogs } from 'blog/components/Blogs';

const BlogsManager = ({ blogs, user }) => {
  const [removeBlog] = useRemoveBlogMutation();
  const [updateLike] = useIncrementLikeMutation();
  const match = useMatch('/blogs/:blogId');

  const handleLikeClick = async (blogData) => {
    updateLike(blogData);
  };

  const blog = match ? blogs.find((blog) => String(blog.id) === String(match.params.blogId)) : null;

  const handleDelete = async (blog) => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.user.username}`);
    if (result === false) return;
    removeBlog(blog.id);
  };

  console.log({ blog });

  return (
    <Routes>
      <Route
        index
        element={
          <Blogs
            blogs={blogs}
            handleLikeClick={handleLikeClick}
            handleDelete={handleDelete}
            loggedUserName={user.username}
          />
        }
      />
      <Route
        path=":blogId"
        element={
          blog && (
            <Blog
              blog={blog}
              handleLikeClick={handleLikeClick}
              handleDelete={handleDelete}
              userCreatedBlog={user.username === blog.user.username}
            />
          )
        }
      />
    </Routes>
  );
};

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
