import React from 'react';
import { useForm } from 'react-hook-form';

import { FormInput, Button, Container, CenteredFlex, Heading } from 'ui';

const LoginForm = ({ handleSubmit }) => {
  const {
    handleSubmit: RHKHandleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = ({ username, password }) => {
    handleSubmit(username, password);
  };

  console.log({ errors });

  return (
    <Container maxW="50%" centerContent>
      <CenteredFlex>
        <Heading>login to application</Heading>
        <form onSubmit={RHKHandleSubmit(onSubmit)}>
          <FormInput
            htmlFor="username"
            labelText="username"
            dataTestId="username"
            id="username"
            type="username"
            error={errors.username}
            isRequired
            {...register('username', {
              required: 'Name is required',
              minLength: { value: 3, message: 'Minimum length should be 3' }
            })}
          />
          <FormInput
            htmlFor="password"
            labelText="password"
            id="password"
            type="password"
            dataTestId="password"
            isRequired
            error={errors.password}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 3, message: 'Minimum length should be 3' }
            })}
          />
          <Button data-testid="submit" type="submit" isLoading={isSubmitting}>
            login
          </Button>
        </form>
      </CenteredFlex>
    </Container>
  );
};

export default LoginForm;
