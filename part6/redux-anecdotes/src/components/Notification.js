import React from 'react';
import { useSelector } from 'react-redux';

export const Notification = () => {
  const notification = useSelector((state) =>
    state.notification ? `you voted "${state.notification}"` : undefined,
  );
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return notification && <div style={style}>{notification}</div>;
};
