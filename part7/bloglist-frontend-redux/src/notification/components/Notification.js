import React from 'react';
import { Alert } from 'ui';

export const ErrorNotification = ({ message }) => {
  if (!message) return null;
  return <Alert message={message} status="error" dataTestId="error" />;
};

export const SuccessNotification = ({ message }) => {
  if (!message) return null;
  return <Alert message={message} status="success" dataTestId="success" />;
};
