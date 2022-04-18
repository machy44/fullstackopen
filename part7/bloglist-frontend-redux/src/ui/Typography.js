import React from 'react';
import { Heading as CHeading } from '@chakra-ui/react';

export const Heading = ({ children }) => {
  return (
    <CHeading as="h1" size="xl" isTruncated>
      {children}
    </CHeading>
  );
};
