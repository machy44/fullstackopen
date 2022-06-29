import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import './index.css';
import { PersonData } from './types';
import { Persons } from './components/Persons';
import { PersonForm } from './components/PersonForm';
import { ALL_PERSONS } from './queries';

const Notify = ({ errorMessage }: { errorMessage: string | null }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}> {errorMessage} </div>;
};

const App = () => {
  const { loading, data } = useQuery<PersonData>(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <Persons persons={data?.allPersons} />
      <PersonForm setError={notify} />
    </>
  );
};

export default App;
