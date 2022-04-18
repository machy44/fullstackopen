import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export const FormInput = ({ isRequired = false, htmlFor, id, type, labelText, onChange, dataTestId, value }) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel htmlFor={htmlFor}>{labelText}</FormLabel>
      <Input id={id} type={type} onChange={onChange} data-testid={dataTestId} value={value} />
    </FormControl>
  );
};
