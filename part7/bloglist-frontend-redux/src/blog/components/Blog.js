import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
};

export const BlogMainInfo = ({ blog }) => {
  return (
    <div style={blogStyle}>
      <Link data-testid="blog-main-info" to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

const Comments = ({ comments }) => {
  return (
    <>
      <h3>comments</h3>
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.text}</li>;
        })}
      </ul>
    </>
  );
};

export const BlogDetails = ({ blog, handleLikeClick, handleDelete, userCreatedBlog }) => {
  return (
    <div data-testid="blog-details">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <div data-testid="blog-likes">
        likes {blog.likes}
        <button onClick={() => handleLikeClick(blog)}>like</button>
      </div>
      <div>{blog.user.username}</div>
      {userCreatedBlog && (
        <button data-testid="remove-button" onClick={() => handleDelete(blog)}>
          remove
        </button>
      )}
      <Comments comments={blog.comments} />
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

BlogDetails.propTypes = {
  blog: BlogType.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  userCreatedBlog: PropTypes.bool.isRequired
};
