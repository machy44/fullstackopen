import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Card, Text, UnorderedList, ListItem, Button, AlertDialog, Heading } from 'ui';
import { HStack, Link as Clink, Box } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Comments } from '../../comments/Comments';

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

export const BlogDetails = ({ blog, handleLikeClick, handleDelete, userCreatedBlog, handleCommentBlog }) => {
  const [shouldConfirm, setConfirm] = useState(false);

  const confirmDelete = () => {
    setConfirm(true);
  };

  return (
    <Box p={3}>
      <Heading mb={2}>
        {blog.title} by {blog.author}
      </Heading>
      <UnorderedList data-testid="blog-details" spacing={3}>
        <ListItem>
          <Clink href={blog.url} isExternal>
            {blog.url} <ExternalLinkIcon mx="2px" />
          </Clink>
        </ListItem>
        <ListItem data-testid="blog-likes">
          <HStack spacing={6} w="20%" justifyContent="space-between">
            <Text>likes {blog.likes}</Text>
            <Button type="button" onClick={() => handleLikeClick(blog)}>
              like
            </Button>
          </HStack>
        </ListItem>
        <ListItem>
          <HStack spacing={6} w="20%" justifyContent="space-between">
            <Text>{blog.user.username}</Text>
            {userCreatedBlog && (
              <Button type="button" data-testid="remove-button" onClick={confirmDelete}>
                remove
              </Button>
            )}
          </HStack>
        </ListItem>
      </UnorderedList>
      <Box mt={6}>
        <Comments comments={blog.comments} handleSubmit={handleCommentBlog} />
      </Box>
      <AlertDialog
        body={`Remove ${blog.title} by ${blog.user.username}`}
        isOpen={shouldConfirm}
        onSubmit={() => handleDelete(blog)}
        onCancel={() => setConfirm(false)}
      />
    </Box>
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
