import React from 'react';

export const Notify = ({ errorMessage }: { errorMessage: string | null }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}> {errorMessage} </div>;
};
