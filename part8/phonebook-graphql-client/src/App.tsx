import { gql, useQuery } from '@apollo/client';
import React from 'react';
import './index.css';

interface Address {
  street: string;
  city: string;
}

interface Person {
  id: number;
  name: string;
  phone: number;
  address: Address;
}

interface PersonData {
  allPersons: Person[];
}

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

  return <div>{data?.allPersons.map((p) => p.name).join(', ')}</div>;
};

export default App;
