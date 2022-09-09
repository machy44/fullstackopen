import React, { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import './index.css';
import { PersonData } from './types';
import { Persons } from './components/Persons';
import { PersonForm } from './components/PersonForm';
import { ALL_PERSONS } from './queries';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

const Notify = ({ errorMessage }: { errorMessage: string | null }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}> {errorMessage} </div>;
};

const App = () => {
  const { loading, data } = useQuery<PersonData>(ALL_PERSONS);
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const client = useApolloClient();

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={data?.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
};

export default App;
