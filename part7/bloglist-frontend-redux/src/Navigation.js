import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
    </div>
  );
};
