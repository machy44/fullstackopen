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

interface IPersons {
  persons: Person[] | undefined;
}

const Persons: React.FC<IPersons> = ({ persons }) => {
  if (persons === undefined) return null;
  return <div>{persons.map((p) => p.name).join(', ')}</div>;
};

const App = () => {
  const { loading, data } = useQuery<PersonData>(ALL_PERSONS);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Persons persons={data?.allPersons} />;
};

export default App;
