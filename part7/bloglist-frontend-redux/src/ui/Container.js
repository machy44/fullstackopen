import React from 'react';
import { Container as CContainer } from '@chakra-ui/react';

export const Container = ({ children, ...props }) => {
  return (
    <CContainer height="100vh" {...props}>
      {children}
    </CContainer>
  );
};
