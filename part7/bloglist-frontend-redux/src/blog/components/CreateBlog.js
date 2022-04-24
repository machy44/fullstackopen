import React from 'react';
import * as yup from 'yup';
import { Button, FormInput, Form, Modal } from 'ui';
import { useCreateBlogMutation } from '../services/blogs';
import { useDisclosure, Box } from '@chakra-ui/react';
import { useAnalytics } from '../../firebase/analytics';

const schema = yup
  .object()
  .shape({
    title: yup.string().min(3).required('title is required'),
    author: yup.string().min(3).required('author is required'),
    url: yup.string().min(3).required('urls is required')
  })
  .required();

export const CreateBlogForm = ({ handleSubmit }) => {
  return (
    <Form handleSubmit={handleSubmit} schemaValidation={schema} dataTestId="create-blog-form" title="create new">
      {({ register, errors, isSubmitting }) => (
        <>
          <FormInput id="title" error={errors.title} {...register('title')} />
          <FormInput id="author" error={errors.author} {...register('author')} />
          <FormInput id="url" error={errors.url} {...register('url')} />
          <Button
            isLoading={isSubmitting}
            data-testid="new-blog-form-submit"
            type="submit"
            disabled={!!errors.title || !!errors.author || !!errors.url}>
            create
          </Button>
        </>
      )}
    </Form>
  );
};

export const CreateBlog = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { blogCreated } = useAnalytics();
  const [createBlog] = useCreateBlogMutation();
  const handleCreate = (blogData) => {
    createBlog(blogData);
    blogCreated(blogData);
    onClose();
  };
  return (
    <Box mt={4} mb={4}>
      <Button type="button" onClick={onOpen}>
        create blog
      </Button>
      <Modal isOpen={isOpen} title="Create blog" onClose={onClose}>
        <CreateBlogForm handleSubmit={handleCreate} />
      </Modal>
    </Box>
  );
};
