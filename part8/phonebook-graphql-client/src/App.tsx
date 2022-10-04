import React, { useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import './index.css';
import { PersonData } from './types';
import { Persons } from './components/Persons';
import { PersonForm } from './components/PersonForm';
import { ALL_PERSONS, PersonAddedSubscription, PERSON_ADDED } from './graphqlActions';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';
import { Notify } from './components/Notifiy';

const App = () => {
  const { loading, data } = useQuery<PersonData>(ALL_PERSONS);
  const [token, setToken] = useState(null);
  useSubscription<PersonAddedSubscription>(PERSON_ADDED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      const addedPerson = subscriptionData.data?.personAdded;

      if (addedPerson) {
        notify(`${addedPerson.name} added`);
      }
      client.cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return { allPersons: allPersons.concat(addedPerson) };
      });
    },
  });
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
