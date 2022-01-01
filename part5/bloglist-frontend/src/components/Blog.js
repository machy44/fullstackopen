import React, { useState } from 'react';
import PropTypes from 'prop-types';


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

const Blog = ({ blog, handleLikeClick, handleDelete, userCreatedBlog }) => {
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
          {userCreatedBlog && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    likes: PropTypes.number,
    id: PropTypes.string,
    url: PropTypes.string,
    author: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      name: PropTypes.string
    })
  }).isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  userCreatedBlog: PropTypes.bool.isRequired
}

export default Blog;
