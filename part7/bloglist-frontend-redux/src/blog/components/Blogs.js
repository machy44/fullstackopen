import { Blog } from 'blog/components';
import React from 'react';

export function Blogs({ blogs, handleLikeClick, handleDelete, loggedUserName }) {
  const sortByLikes = (a, b) => {
    return b.likes - a.likes;
  };
  return [...blogs]
    .sort(sortByLikes)
    .map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        handleLikeClick={handleLikeClick}
        handleDelete={handleDelete}
        userCreatedBlog={loggedUserName === blog.user.username}
      />
    ));
}
