import React from 'react';
import * as yup from 'yup';
import { FormInput, Button, Container, CenteredFlex, Form } from 'ui';
import { useAnalytics } from '../../firebase/analytics';

const schema = yup
  .object()
  .shape({
    username: yup.string().min(3, 'Minimum length should be 3').required('Name is required'),
    password: yup.string().min(3, 'Minimum length should be 3').required('Password is required')
  })
  .required();

const LoginForm = ({ handleSubmit }) => {
  const events = useAnalytics();

  const onSubmit = ({ username, password }) => {
    handleSubmit(username, password);
    events?.loginEvent(username);
  };

  return (
    <Container maxW="50%" centerContent>
      <CenteredFlex>
        <Form handleSubmit={onSubmit} schemaValidation={schema} title="login to application">
          {({ register, errors, isSubmitting }) => {
            return (
              <>
                <FormInput id="username" error={errors.username} {...register('username')} />
                <FormInput id="password" error={errors.password} {...register('password')} />
                <Button
                  data-testid="submit"
                  type="submit"
                  isLoading={isSubmitting}
                  width="full"
                  disabled={!!errors.username || !!errors.password}>
                  login
                </Button>
              </>
            );
          }}
        </Form>
      </CenteredFlex>
    </Container>
  );
};

export default LoginForm;
