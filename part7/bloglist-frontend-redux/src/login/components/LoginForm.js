import React, { useState } from 'react';
import { FormInput, Button, Container, CenteredFlex } from 'ui';

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    handleSubmit(e, username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <Container maxW="50%" centerContent>
      <CenteredFlex>
        <h1>login to application</h1>
        <form onSubmit={onSubmit}>
          <FormInput
            htmlFor="name"
            labelText="username"
            dataTestId="username"
            id="name"
            type="name"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            isRequired
          />
          <FormInput
            htmlFor="password"
            labelText="password"
            id="password"
            type="password"
            dataTestId="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            isRequired
          />
          <Button data-testid="submit" type="submit">
            login
          </Button>
        </form>
      </CenteredFlex>
    </Container>
  );
};

export default LoginForm;
