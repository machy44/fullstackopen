import React from 'react';
import { BlogMainInfo } from './Blog';
import { CreateBlog } from './CreateBlog';

export function Blogs({ blogs }) {
  const sortByLikes = (a, b) => {
    return b.likes - a.likes;
  };
  return (
    <>
      <CreateBlog />
      {[...blogs].sort(sortByLikes).map((blog) => (
        <BlogMainInfo key={blog.id} blog={blog} />
      ))}
    </>
  );
}
