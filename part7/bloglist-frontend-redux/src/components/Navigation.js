import React from 'react';
import { Button, Text, Flex, HStack, Link as CLink, Spacer, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useResolvedPath, useMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MoonIcon } from '@chakra-ui/icons';

function CustomLink({ text, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  console.log({ resolved });
  console.log({ match });

  return (
    <CLink as={Link} to={to} {...props} color={match ? 'teal.500' : ''}>
      <Text>{text}</Text>
    </CLink>
  );
}

export const Navigation = ({ userName, handleClick }) => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('blue.100', 'whiteAlpha.100');
  return (
    <Flex p={5} background={bgColor} borderRadius="base">
      <HStack spacing={4}>
        <CustomLink to="/blogs" text="blogs" />
        <CustomLink to="/users" text="users" />
      </HStack>
      <Spacer />
      <HStack spacing={4}>
        <p>{userName} is logged in</p>
        <MoonIcon onClick={toggleColorMode} />
        <Button onClick={handleClick} mr="4">
          logout
        </Button>
      </HStack>
    </Flex>
  );
};
