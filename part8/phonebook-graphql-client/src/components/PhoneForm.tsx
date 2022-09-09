import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_NUMBER } from '../queries';

const PhoneForm: React.FC<{ setError: (arg: string) => void }> = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Surprisingly, when a person's number is changed,
  // the new number automatically appears on the list of
  // persons rendered by the Persons component.
  // This happens because each person has an identifying field of type ID,
  // so the person's details saved to the cache update automatically when
  // they are changed with the mutation.
  const [changeNumber, result] = useMutation(EDIT_NUMBER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    changeNumber({ variables: { name, phone } });
    setName('');
    setPhone('');
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found');
    }
  }, [result.data]);

  return (
    <div>
      <h2>change number</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          phone <input value={phone} onChange={({ target }) => setPhone(target.value)} />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  );
};

export default PhoneForm;
