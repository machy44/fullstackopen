import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormInput, Button, Container, CenteredFlex, Heading } from 'ui';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object()
  .shape({
    username: yup.string().min(3, 'Minimum length should be 3').required('Name is required'),
    password: yup.string().min(3, 'Minimum length should be 3').required('Password is required')
  })
  .required();

const LoginForm = ({ handleSubmit }) => {
  const {
    handleSubmit: RHKHandleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

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
            {...register('username')}
          />
          <FormInput
            htmlFor="password"
            labelText="password"
            id="password"
            type="password"
            dataTestId="password"
            error={errors.password}
            {...register('password')}
          />
          <Button
            data-testid="submit"
            type="submit"
            isLoading={isSubmitting}
            width="full"
            disabled={!!errors.username || !!errors.password}>
            login
          </Button>
        </form>
      </CenteredFlex>
    </Container>
  );
};

export default LoginForm;
