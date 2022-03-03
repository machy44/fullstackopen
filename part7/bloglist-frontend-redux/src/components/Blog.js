import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogMainInfo = ({ blog }) => {
  return (
    <span data-testid="blog-main-info">
      {blog.title} {blog.author}
    </span>
  );
};
const BlogDetails = ({ blog, handleLikeClick }) => {
  return (
    <div data-testid="blog-details">
      <div>{blog.url}</div>
      <div data-testid="blog-likes">
        likes {blog.likes}
        <button onClick={() => handleLikeClick(blog)}>like</button>
      </div>
      <div>{blog.user.username}</div>
    </div>
  );
};

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

export const Blog = ({ blog, handleLikeClick, handleDelete, userCreatedBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <BlogMainInfo blog={blog} />
      {!visible && (
        <button data-testid="toggle-visibility-button" onClick={toggleVisibility}>
          view
        </button>
      )}
      {visible && (
        <>
          <button onClick={toggleVisibility}>hide</button>
          <BlogDetails blog={blog} handleLikeClick={handleLikeClick} />
          {userCreatedBlog && (
            <button data-testid="remove-button" onClick={() => handleDelete(blog)}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  );
};

const UserType = PropTypes.shape({
  id: PropTypes.string,
  username: PropTypes.string,
  name: PropTypes.string
});

const BlogType = PropTypes.shape({
  title: PropTypes.string,
  likes: PropTypes.number,
  id: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.string,
  user: UserType
});

Blog.propTypes = {
  blog: BlogType.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  userCreatedBlog: PropTypes.bool.isRequired
};
