import React, { forwardRef } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, VStack, Center } from '@chakra-ui/react';
import { Heading } from './Typography';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

export const FormInput = forwardRef(
  ({ id, type, labelText, dataTestId, error, isRequired = true, ...validationProps }, ref) => {
    console.log({ validationProps });
    return (
      <FormControl isRequired={isRequired} isInvalid={error}>
        <FormLabel htmlFor={id}>{labelText || id}</FormLabel>
        <Input id={id} type={type || id} data-testid={dataTestId || id} {...validationProps} ref={ref} />
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      </FormControl>
    );
  }
);

FormInput.displayName = 'FormInput';

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  labelText: PropTypes.string,
  dataTestId: PropTypes.string,
  isRequired: PropTypes.bool,
  error: PropTypes.object.isRequired,
  validationProps: PropTypes.object.isRequired
};

export const Form = ({ handleSubmit, children, schemaValidation, title, dataTestId }) => {
  const {
    handleSubmit: RHKHandleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaValidation)
  });
  return (
    <form data-testid={dataTestId} onSubmit={RHKHandleSubmit(handleSubmit)}>
      <VStack spacing={5} align="stretch">
        {typeof title === 'string' ? (
          <Center>
            <Heading>{title}</Heading>
          </Center>
        ) : (
          title
        )}
        {children({ register, errors, isSubmitting })}
      </VStack>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  schemaValidation: PropTypes.object.isRequired,
  title: PropTypes.oneOf([PropTypes.element.isRequired, PropTypes.string.isRequired]),
  dataTestId: PropTypes.string
};
