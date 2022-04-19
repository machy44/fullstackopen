import { TableContainer, Table as CTable, TableCaption } from '@chakra-ui/react';
import React from 'react';

export const Table = ({ children, variant, title }) => {
  return (
    <TableContainer>
      <CTable size="sm" variant={variant}>
        {title && <TableCaption>{title}</TableCaption>}
        {children}
      </CTable>
    </TableContainer>
  );
};
