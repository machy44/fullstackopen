import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Card, Text, UnorderedList, ListItem, Heading, Button } from 'ui';
import { Flex, Link as Clink } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const BlogMainInfo = ({ blog }) => {
  return (
    <Card>
      <Clink as={Link} data-testid="blog-main-info" to={`/blogs/${blog.id}`}>
        <Text>
          {blog.title} by {blog.author}
        </Text>
      </Clink>
    </Card>
  );
};

const Comments = ({ comments }) => {
  return (
    <>
      <Heading>comments</Heading>
      <UnorderedList>
        {comments.map((comment) => {
          return <ListItem key={comment.id}>{comment.text}</ListItem>;
        })}
      </UnorderedList>
    </>
  );
};

export const BlogDetails = ({ blog, handleLikeClick, handleDelete, userCreatedBlog }) => {
  return (
    <>
      <UnorderedList data-testid="blog-details">
        <ListItem>
          <h1>
            {blog.title} {blog.author}
          </h1>
        </ListItem>
        <ListItem>
          <Clink href={blog.url} isExternal>
            {blog.url} <ExternalLinkIcon mx="2px" />
          </Clink>
        </ListItem>
        <ListItem data-testid="blog-likes">
          <Flex alignItems="center">
            <Text>likes {blog.likes}</Text>
            <Button type="button" onClick={() => handleLikeClick(blog)}>
              like
            </Button>
          </Flex>
        </ListItem>
        <ListItem>
          {blog.user.username}
          {userCreatedBlog && (
            <Button type="button" data-testid="remove-button" onClick={() => handleDelete(blog)}>
              remove
            </Button>
          )}
        </ListItem>
      </UnorderedList>
      <Comments comments={blog.comments} />
    </>
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
