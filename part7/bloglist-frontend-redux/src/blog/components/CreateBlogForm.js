import React from 'react';
import * as yup from 'yup';
import { Button, FormInput, Form } from 'ui';

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
        </>
      )}
    </Form>
  );
};
