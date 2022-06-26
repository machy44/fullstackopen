import React from 'react';
import { gql, useQuery } from '@apollo/client';
import './index.css';
import { PersonData } from './types';
import { Persons } from './Persons';

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

const App = () => {
  const { loading, data } = useQuery<PersonData>(ALL_PERSONS);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Persons persons={data?.allPersons} />;
};

export default App;
