import React from 'react';
import { Button as CButton } from '@chakra-ui/react';

export const Button = ({ type, children, ...props }) => {
  return (
    <CButton mt={4} colorScheme="teal" type={type} {...props}>
      {children}
    </CButton>
  );
};
