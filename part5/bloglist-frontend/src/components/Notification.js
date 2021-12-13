import React from 'react';

export const ErrorNotification = ({ message }) => {
  return <div className="error">{message}</div>;
};

export const SuccessNotification = ({ message }) => {
  return <div className="success">{message}</div>;
};
