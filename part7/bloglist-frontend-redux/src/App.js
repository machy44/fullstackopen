/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { Navigation, NotExists } from './components';
import { LoginForm } from './login/components';
import { CreateBlogForm } from './blog/components';
import { ErrorNotification, SuccessNotification } from './notification/components';
import { Users } from './user/components/Users';
import { User } from './user/components/User';
import { useGetBlogsQuery, useCreateBlogMutation } from './blog/services/blogs';
import { Center, Spinner, VStack, Spacer } from '@chakra-ui/react';

import { useLogin } from './login/hooks';
import { useSelector } from 'react-redux';
import { selectSuccessNotification, selectErrorNotification } from './notification/redux/notificationSlice';
import { Routes, Route, Outlet } from 'react-router-dom';
import { BlogsManager } from 'blog/components';
import { Container, Heading } from 'ui';
import { useDisclosure } from '@chakra-ui/react';
import { Modal } from 'ui';
import { Button } from './ui/Button';

const CreateBlog = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [createBlog] = useCreateBlogMutation();
  const handleCreate = async (blogData) => {
    createBlog(blogData);
    onClose();
  };
  return (
    <>
      <Button type="button" onClick={onOpen} mb={4}>
        create blog
      </Button>
      <Modal isOpen={isOpen} title="Create blog" onClose={onClose}>
        <CreateBlogForm handleSubmit={handleCreate} />
      </Modal>
    </>
  );
};

const Layout = ({ error, handleLogout, userName }) => {
  const notificationSuccess = useSelector(selectSuccessNotification);

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
      <CreateBlog />
      <VStack spacing={5} align="stretch">
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
