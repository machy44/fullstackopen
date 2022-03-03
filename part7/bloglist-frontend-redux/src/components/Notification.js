import React from 'react';

export const ErrorNotification = ({ message }) => {
  return (
    <div className="error" data-testid="error">
      {message}
    </div>
  );
};

export const SuccessNotification = ({ message }) => {
  return (
    <div className="success" data-testid="success">
      {message}
    </div>
  );
};
