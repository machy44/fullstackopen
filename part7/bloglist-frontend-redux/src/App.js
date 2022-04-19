/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { Togglable, Navigation, NotExists } from './components';
import { LoginForm } from './login/components';
import { CreateBlogForm } from './blog/components';
import { ErrorNotification, SuccessNotification } from './notification/components';
import { Users } from './user/components/Users';
import { User } from './user/components/User';
import { useGetBlogsQuery, useCreateBlogMutation } from './blog/services/blogs';
import { Center, Spinner, VStack } from '@chakra-ui/react';

import { useLogin } from './login/hooks';
import { useSelector } from 'react-redux';
import { selectSuccessNotification, selectErrorNotification } from './notification/redux/notificationSlice';
import { Routes, Route, Outlet } from 'react-router-dom';
import { BlogsManager } from 'blog/components';
import { Container, Heading } from 'ui';

const Layout = ({ error, handleLogout, userName }) => {
  const notificationSuccess = useSelector(selectSuccessNotification);
  const [createBlog, result] = useCreateBlogMutation();
  const blogFormRef = useRef();

  const handleCreate = async (event, blogData, userName) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    createBlog(blogData);
  };
  return (
    <Container maxW="container.md">
      <Center bg="gray.50" h="100px" color="white">
        <Heading as="i" color="blackAlpha.800">
          blog app
        </Heading>
      </Center>
      <Navigation userName={userName} handleClick={handleLogout} />
      <SuccessNotification message={notificationSuccess} />
      {error && <ErrorNotification message={error} />}
      <VStack spacing={5} align="stretch">
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <CreateBlogForm handleSubmit={handleCreate} />
        </Togglable>
        <Outlet />
      </VStack>
    </Container>
  );
};

const App = () => {
  const error = useSelector(selectErrorNotification);
  const { data: blogs, isLoading: isLoadingBlogs } = useGetBlogsQuery();

  const { handleLogin, isLoading, user, handleLogout } = useLogin();

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
