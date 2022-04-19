import React from 'react';
import { BlogDetails } from './Blog';
import { useIncrementLikeMutation, useRemoveBlogMutation } from '../services/blogs';
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import { Blogs } from './Blogs';

export const BlogsManager = ({ blogs, user }) => {
  const [removeBlog] = useRemoveBlogMutation();
  const [updateLike] = useIncrementLikeMutation();
  const match = useMatch('/blogs/:blogId');
  const navigate = useNavigate();

  const handleLikeClick = async (blogData) => {
    updateLike(blogData);
  };

  const blog = match ? blogs.find((blog) => String(blog.id) === String(match.params.blogId)) : null;

  const handleDelete = async (blog) => {
    removeBlog(blog.id);
    navigate(-1);
  };

  return (
    <Routes>
      <Route index element={<Blogs blogs={blogs} />} />
      <Route
        path=":blogId"
        element={
          blog && (
            <BlogDetails
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
