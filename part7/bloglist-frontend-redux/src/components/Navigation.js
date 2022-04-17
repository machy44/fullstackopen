import React from 'react';
import { Button, Text, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Navigation = ({ userName, handleClick }) => {
  return (
    <Flex>
      <Link to="/blogs">
        <Text>blogs</Text>
      </Link>
      <Link to="/users">
        <Text>users</Text>
      </Link>
      <p>{userName} is logged in</p>
      <Button onClick={handleClick}>logout</Button>
    </Flex>
  );
};
