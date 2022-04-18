import React from 'react';
import { Flex as CFlex } from '@chakra-ui/react';

export const Flex = CFlex;

export const CenteredFlex = ({ children }) => {
  return (
    <Flex width="full" align="center" justifyContent="center" height="100%" direction="column">
      {children}
    </Flex>
  );
};
