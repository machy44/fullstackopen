import React, { useState } from 'react';

const BlogMainInfo = ({ blog }) => {
  return (
    <span>
      {blog.title} {blog.author}
    </span>
  );
};
const BlogDetails = ({ blog, handleLikeClick }) => {
  return (
    <>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={() => handleLikeClick(blog)}>like</button>
      </div>
      <div>{blog.user.username}</div>
    </>
  );
};

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, handleLikeClick, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <BlogMainInfo blog={blog} />
      {!visible && <button onClick={toggleVisibility}>view</button>}
      {visible && (
        <>
          <button onClick={toggleVisibility}>hide</button>
          <BlogDetails blog={blog} handleLikeClick={handleLikeClick} />
          {user.username === blog.user.username && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
