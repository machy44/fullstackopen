import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { IPerson } from './types';

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

const Person: React.FC<{
  person: IPerson;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

interface IPersons {
  persons: IPerson[] | undefined;
}

export const Persons: React.FC<IPersons> = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState<string | null>(null);
  const result = useQuery(FIND_PERSON, { variables: { nameToSearch }, skip: !nameToSearch });
  if (nameToSearch && result.data) {
    return <Person person={result.data.findPerson} onClose={() => setNameToSearch(null)} />;
  }
  return (
    <div>
      <h2>Persons</h2>
      {persons && persons.length ? (
        persons.map((p) => (
          <div key={p.name}>
            {p.name} {p.phone}
            <button onClick={() => setNameToSearch(p.name)}> show address </button>{' '}
          </div>
        ))
      ) : (
        <div>No persons exist</div>
      )}
    </div>
  );
};
