import { VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Button, Heading } from 'ui';

export const CreateBlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const onSubmit = (e) => {
    handleSubmit(e, { title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <Heading>create new</Heading>
      <form onSubmit={onSubmit} data-testid="create-blog-form">
        <VStack spacing={5} align="stretch">
          {/* <FormInput
            htmlFor="title"
            labelText="title"
            dataTestId="title"
            id="title"
            type="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            isRequired
          />
          <FormInput
            htmlFor="author"
            labelText="author"
            dataTestId="author"
            id="author"
            type="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            isRequired
          />
          <FormInput
            htmlFor="url"
            labelText="url"
            dataTestId="url"
            id="url"
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            isRequired
          /> */}
          <Button data-testid="new-blog-form-submit" type="submit">
            create
          </Button>
        </VStack>
      </form>
    </>
  );
};
