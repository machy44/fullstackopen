import React, { forwardRef } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';

export const FormInput = forwardRef(
  ({ htmlFor, id, type, labelText, dataTestId, error, isRequired = true, ...validationProps }, ref) => {
    console.log({ validationProps });
    return (
      <FormControl isRequired={isRequired} isInvalid={error}>
        <FormLabel htmlFor={htmlFor}>{labelText}</FormLabel>
        <Input id={id} type={type} data-testid={dataTestId} {...validationProps} ref={ref} />
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      </FormControl>
    );
  }
);

FormInput.displayName = 'FormInput';
