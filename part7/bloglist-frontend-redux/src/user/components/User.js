import React from 'react';
import { useGetUsersQuery } from '../userService';
import { useMatch, Link } from 'react-router-dom';

export const User = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const match = useMatch('/users/:id');

  if (isLoadingUsers) {
    return <div>Loading users</div>;
  }

  console.log({ match });
  const user = match ? users.find((user) => String(user.id) === String(match.params.id)) : null;

  if (!user) {
    return <div>user doesnt exist!</div>;
  }

  console.log({ users });
  return (
    <div>
      <h1>{user.name}</h1>
      {user.blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        );
      })}
    </div>
  );
};
