import React from 'react';

import { Text, Link } from '@chakra-ui/react';

export const NavItem = ({ children }) => {
  return (
    <Link>
      <Text>{children}</Text>
    </Link>
  );
};
