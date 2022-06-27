import React, { useReducer, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_PERSONS, CREATE_PERSON } from './queries';

const initialState = {
  name: '',
  phone: '',
  street: '',
  city: '',
};

// @ts-ignore
function reducer(state, action) {
  switch (action.type) {
    case 'name': {
      return { ...state, name: action.payload };
    }
    case 'phone': {
      return { ...state, phone: action.payload };
    }
    case 'street': {
      return { ...state, street: action.payload };
    }
    case 'city': {
      return { ...state, city: action.payload };
    }
    case 'reset': {
      return initialState;
    }
  }
}

export const PersonForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { name, phone, street, city } = state;

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createPerson({ variables: { name, phone, street, city } });
    dispatch({ type: 'reset' });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => dispatch({ type: 'name', payload: target.value })}
          />
        </div>
        <div>
          phone{' '}
          <input
            value={phone}
            onChange={({ target }) => dispatch({ type: 'phone', payload: target.value })}
          />
        </div>
        <div>
          street
          <input
            value={street}
            onChange={({ target }) => dispatch({ type: 'street', payload: target.value })}
          />
        </div>
        <div>
          city
          <input
            value={city}
            onChange={({ target }) => dispatch({ type: 'city', payload: target.value })}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};
