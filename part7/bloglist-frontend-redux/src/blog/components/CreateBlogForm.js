import { VStack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button, Heading, FormInput } from 'ui';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object()
  .shape({
    title: yup.string().min(3).required('title is required'),
    author: yup.string().min(3).required('author is required'),
    url: yup.string().min(3).required('urls is required')
  })
  .required();

export const CreateBlogForm = ({ handleSubmit }) => {
  const {
    handleSubmit: RHKHandleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  console.log({ errors });

  return (
    <>
      <Heading>create new</Heading>
      <form onSubmit={RHKHandleSubmit(handleSubmit)} data-testid="create-blog-form">
        <VStack spacing={5} align="stretch">
          <FormInput
            htmlFor="title"
            labelText="title"
            dataTestId="title"
            id="title"
            type="title"
            error={errors.title}
            {...register('title')}
          />
          <FormInput
            htmlFor="author"
            labelText="author"
            dataTestId="author"
            id="author"
            type="author"
            error={errors.author}
            {...register('author')}
          />
          <FormInput
            htmlFor="url"
            labelText="url"
            dataTestId="url"
            id="url"
            type="url"
            error={errors.url}
            {...register('url')}
          />
          <Button
            isLoading={isSubmitting}
            data-testid="new-blog-form-submit"
            type="submit"
            disabled={!!errors.title || !!errors.author || !!errors.url}>
            create
          </Button>
        </VStack>
      </form>
    </>
  );
};
