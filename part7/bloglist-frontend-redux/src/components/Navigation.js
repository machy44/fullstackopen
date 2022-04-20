import React from 'react';
import { Button, Text, Flex, HStack, Link as CLink, Spacer, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MoonIcon } from '@chakra-ui/icons';

export const Navigation = ({ userName, handleClick }) => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('blue.100', 'whiteAlpha.100');
  return (
    <Flex p={5} background={bgColor} borderRadius="base">
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
        <MoonIcon onClick={toggleColorMode} />
        <Button onClick={handleClick} mr="4">
          logout
        </Button>
      </HStack>
    </Flex>
  );
};
