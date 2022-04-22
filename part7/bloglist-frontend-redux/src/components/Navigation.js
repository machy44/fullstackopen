import React from 'react';
import {
  Button,
  Text,
  Flex,
  Stack,
  Link as CLink,
  Spacer,
  useColorMode,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useResolvedPath, useMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MoonIcon } from '@chakra-ui/icons';

function NavLink({ text, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: `${resolved.pathname}/*`, end: true });

  return (
    <CLink as={Link} to={to} {...props} color={match ? 'teal.500' : ''}>
      <Text>{text}</Text>
    </CLink>
  );
}

NavLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  props: PropTypes.object
};

const UserSection = ({ userName, handleClick }) => {
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <p>{userName} is logged in</p>
      <Stack spacing={2} direction={['row-reverse', 'row']} align="center">
        <MoonIcon onClick={toggleColorMode} />
        <Spacer />
        <Button onClick={handleClick} mr="4">
          logout
        </Button>
      </Stack>
    </>
  );
};

export const Navigation = ({ userName, handleLogout }) => {
  const bgColor = useColorModeValue('blue.100', 'whiteAlpha.100');
  return (
    <Flex p={5} background={bgColor} borderRadius="base">
      <HStack spacing={4}>
        <NavLink to="/blogs" text="blogs" />
        <NavLink to="/users" text="users" />
      </HStack>
      <Spacer />
      <Stack spacing={4} direction={['column-reverse', 'row']} align={['flex-end', 'center']}>
        <UserSection userName={userName} handleClick={handleLogout} />
      </Stack>
    </Flex>
  );
};
