import React, { forwardRef } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

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

export const Form = ({ handleSubmit, children, schemaValidation, dataTestId }) => {
  const {
    handleSubmit: RHKHandleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaValidation)
  });
  return (
    <form dataTestId={dataTestId} onSubmit={RHKHandleSubmit(handleSubmit)}>
      {children({ register, errors, isSubmitting })}
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  schemaValidation: PropTypes.object.isRequired,
  dataTestId: PropTypes.string
};
