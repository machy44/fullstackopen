import React from 'react';
import { Heading as CHeading, Text as CText } from '@chakra-ui/react';

export const Heading = ({ children, ...props }) => {
  return (
    <CHeading as="h3" size="lg" {...props} isTruncated>
      {children}
    </CHeading>
  );
};

export const Text = CText;
