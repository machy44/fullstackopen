import React from 'react';
import { useGetUsersQuery } from '../userService';
import { useMatch, Link } from 'react-router-dom';
import { Heading, OrderedList, ListItem, Text } from 'ui';
import { Link as CLink, VStack } from '@chakra-ui/react';

export const User = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetUsersQuery();
  const match = useMatch('/users/:id');

  if (isLoadingUsers) {
    return <div>Loading users</div>;
  }

  const user = match ? users.find((user) => String(user.id) === String(match.params.id)) : null;

  if (!user) {
    return <div>user doesnt exist!</div>;
  }

  console.log({ users });

  return (
    <VStack>
      <Heading>{user.name}</Heading>
      <Text casing="uppercase">added blogs</Text>
      <OrderedList spacing={2}>
        {user.blogs.map((blog) => {
          return (
            <ListItem key={blog.id}>
              <CLink as={Link} to={`/blogs/${blog.id}`}>
                {blog.title}
              </CLink>
            </ListItem>
          );
        })}
      </OrderedList>
    </VStack>
  );
};
