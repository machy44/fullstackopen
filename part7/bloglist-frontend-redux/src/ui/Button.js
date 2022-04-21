import React from 'react';
import { Button as CButton } from '@chakra-ui/react';

export const Button = ({ type, children, ...props }) => {
  return (
    <CButton type={type} {...props}>
      {children}
    </CButton>
  );
};
