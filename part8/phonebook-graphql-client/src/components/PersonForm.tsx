import React, { useReducer, useState } from 'react';
import { useMutation, ApolloCache } from '@apollo/client';
import { ALL_PERSONS, CREATE_PERSON } from '../queries';

type InititalState = {
  name: string;
  phone: string;
  street: string;
  city: string;
};

const initialState: InititalState = {
  name: '',
  phone: '',
  street: '',
  city: '',
};

const ACTION_TYPES = {
  name: 'name',
  phone: 'phone',
  street: 'street',
  city: 'city',
  reset: 'reset',
} as const;

type ActionTypes = keyof typeof ACTION_TYPES;

type ActionWithPayload = { type: Exclude<ActionTypes, 'reset'>; payload: string };

type ActionWithoutPayload = { type: Extract<ActionTypes, 'reset'> };

function reducer(state: InititalState, action: ActionWithPayload | ActionWithoutPayload) {
  switch (action.type) {
    case ACTION_TYPES.name: {
      return { ...state, name: action.payload };
    }
    case ACTION_TYPES.phone: {
      return { ...state, phone: action.payload };
    }
    case ACTION_TYPES.street: {
      return { ...state, street: action.payload };
    }
    case ACTION_TYPES.city: {
      return { ...state, city: action.payload };
    }
    case ACTION_TYPES.reset: {
      return initialState;
    }
    default:
      return state;
  }
}

export const PersonForm: React.FC<{ setError: (arg: string) => void }> = ({ setError }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { name, phone, street, city } = state;

  const [createPerson] = useMutation(CREATE_PERSON, {
    // refetchQueries: [{ query: ALL_PERSONS }],
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        };
      });
    },
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createPerson({ variables: { name, phone: phone || undefined, street, city } });
    dispatch({ type: ACTION_TYPES.reset });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => dispatch({ type: ACTION_TYPES.name, payload: target.value })}
          />
        </div>
        <div>
          phone
          <input
            value={phone}
            onChange={({ target }) => dispatch({ type: ACTION_TYPES.phone, payload: target.value })}
          />
        </div>
        <div>
          street
          <input
            value={street}
            onChange={({ target }) =>
              dispatch({ type: ACTION_TYPES.street, payload: target.value })
            }
          />
        </div>
        <div>
          city
          <input
            value={city}
            onChange={({ target }) => dispatch({ type: ACTION_TYPES.city, payload: target.value })}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};
