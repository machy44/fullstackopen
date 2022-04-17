import { BlogMainInfo } from './Blog';
import React from 'react';

export function Blogs({ blogs }) {
  const sortByLikes = (a, b) => {
    return b.likes - a.likes;
  };
  return (
    <>
      {[...blogs].sort(sortByLikes).map((blog) => (
        <BlogMainInfo key={blog.id} blog={blog} />
      ))}
    </>
  );
}
