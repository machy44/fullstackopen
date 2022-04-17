import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = ({ userName, handleClick }) => {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      <p>{userName} is logged in</p>
      <button onClick={handleClick}>logout</button>
    </div>
  );
};
