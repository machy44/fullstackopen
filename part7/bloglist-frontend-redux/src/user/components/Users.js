import React from 'react';
import { useGetUsersQuery } from '../userService';
import { Link } from 'react-router-dom';

export const Users = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  if (isLoadingUsers) {
    return <div>Loading users</div>;
  }

  console.log({ users });
  return (
    <div>
      <h1>Users</h1>
      <span>Blogs created</span>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <Link to={`/users/${user.id}`} style={{ marginRight: 10 }}>
              {user.name}
            </Link>
            <span>{user.blogs.length}</span>
          </div>
        );
      })}
    </div>
  );
};
