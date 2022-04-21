import React from 'react';
import { Navigation, NotExists } from './components';
import { LoginForm } from './login/components';
import { ErrorNotification, SuccessNotification } from './notification/components';
import { Users } from './user/components/Users';
import { User } from './user/components/User';
import { useGetBlogsQuery } from './blog/services/blogs';
import { Center, Spinner, VStack } from '@chakra-ui/react';

import { useLogin } from './login/hooks';
import { useSelector } from 'react-redux';
import { selectSuccessNotification, selectErrorNotification } from './notification/redux/notificationSlice';
import { Routes, Route, Outlet } from 'react-router-dom';
import { BlogsManager } from 'blog/components';
import { Container, Heading } from 'ui';
import { useColorModeValue } from '@chakra-ui/react';

const Layout = ({ error, handleLogout, userName }) => {
  const notificationSuccess = useSelector(selectSuccessNotification);
  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.50');
  const textColor = useColorModeValue('blackAlpha.800', 'red.50');
  return (
    <Container maxW="container.md">
      <Center bg={bgColor} h="100px" color="white">
        <Heading as="i" color={textColor}>
          blog app
        </Heading>
      </Center>
      <Navigation userName={userName} handleClick={handleLogout} />
      <SuccessNotification message={notificationSuccess} />
      {error && <ErrorNotification message={error} />}
      <VStack spacing={5} align="stretch">
        <Outlet />
      </VStack>
    </Container>
  );
};

const App = () => {
  const error = useSelector(selectErrorNotification);
  const { data: blogs, isLoading: isLoadingBlogs } = useGetBlogsQuery();

  const { handleLogin,  user, handleLogout } = useLogin();

  if (user === null) {
    return (
      <>
        {error && <ErrorNotification message={error} />}
        <LoginForm handleSubmit={handleLogin} />
      </>
    );
  }

  if (isLoadingBlogs) {
    return <Spinner size="lg" />;
  }

  return (
    <Routes>
      <Route element={<Layout error={error} handleLogout={handleLogout} userName={user.name} />}>
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
        <Route index element={<BlogsManager blogs={blogs} user={user} />} />
        <Route path="blogs/*" element={<BlogsManager blogs={blogs} user={user} />} />
        <Route path="*" element={<NotExists />} />
      </Route>
    </Routes>
  );
};

export default App;
