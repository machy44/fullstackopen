import React from 'react';
import { Alert } from 'ui';

export const ErrorNotification = ({ message }) => {
  if (!message) return null;
  return <Alert message={message} status="error" />;
  // return (
  //   // <div className="error" data-testid="error">
  //   //   {message}
  //   // </div>
  //   <Alert status="error">
  //     <AlertIcon />
  //     <AlertDescription>{message}</AlertDescription>
  //   </Alert>
  // );
};

export const SuccessNotification = ({ message }) => {
  if (!message) return null;
  return <Alert message={message} status="success" />;
  // return (
  //   // <div className="success" data-testid="success">
  //   //   {message}
  //   // </div>
  //   <Alert status="success">
  //     <AlertIcon />
  //     <AlertDescription>{message}</AlertDescription>
  //   </Alert>
  // );
};
