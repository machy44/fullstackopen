import React from 'react';
import { useGetUsersQuery } from '../userService';
import { Text, Table } from 'ui';
import { Link as CLink, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Users = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  if (isLoadingUsers) {
    return <div>Loading users</div>;
  }

  return (
    <Table title="Users" variant="striped">
      <Thead>
        <Tr>
          <Th>user</Th>
          <Th>blogs created</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => {
          return (
            <Tr key={user.id}>
              <Td>
                {user.blogs.length ? (
                  <CLink as={Link} to={`/users/${user.id}`}>
                    {user.name}
                  </CLink>
                ) : (
                  <Text>{user.name}</Text>
                )}
              </Td>
              <Td>
                <Text>{user.blogs.length}</Text>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
