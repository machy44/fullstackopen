import { Box } from '@chakra-ui/react';
import React from 'react';

export const Card = (props) => {
  return <Box p={5} shadow="md" borderWidth="1px" {...props} />;
};
