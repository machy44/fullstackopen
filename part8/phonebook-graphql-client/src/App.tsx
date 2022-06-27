import React from 'react';
import { useQuery } from '@apollo/client';
import './index.css';
import { PersonData } from './types';
import { Persons } from './Persons';
import { PersonForm } from './PersonForm';
import { ALL_PERSONS } from './queries';

const App = () => {
  const { loading, data } = useQuery<PersonData>(ALL_PERSONS);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <PersonForm />
      <Persons persons={data?.allPersons} />
    </>
  );
};

export default App;
