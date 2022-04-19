import React from 'react';
import { Button, Text, Flex, HStack, Link as CLink, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Navigation = ({ userName, handleClick }) => {
  return (
    <Flex p={5} background="blue.100" borderRadius="base">
      <HStack spacing="24px">
        <CLink as={Link} to="/blogs">
          <Text>blogs</Text>
        </CLink>

        <CLink as={Link} to="/users">
          <Text>users</Text>
        </CLink>
      </HStack>
      <Spacer />
      <HStack spacing="24px">
        <p>{userName} is logged in</p>
        <Button onClick={handleClick} colorScheme="teal" mr="4">
          logout
        </Button>
      </HStack>
    </Flex>
  );
};
