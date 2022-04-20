import React from 'react';
import { UnorderedList, ListItem, Heading, Button, Form, FormInput } from 'ui';

import * as yup from 'yup';

const schema = yup.object().shape({
  comment: yup.string().min(3).required()
});

export const Comments = ({ comments, handleSubmit }) => {
  return (
    <>
      <Heading>comments</Heading>
      <Form handleSubmit={handleSubmit} schemaValidation={schema} title={null}>
        {({ register, errors, isSubmitting }) => {
          return (
            <>
              <FormInput id="comment" labelText="text" error={errors.username} {...register('comment')} />
              <Button
                data-testid="comment-submit"
                type="submit"
                isLoading={isSubmitting}
                width="full"
                disabled={!!errors.comment}>
                add comment
              </Button>
            </>
          );
        }}
      </Form>
      <UnorderedList>
        {comments.map((comment) => {
          return <ListItem key={comment.id}>{comment.text}</ListItem>;
        })}
      </UnorderedList>
    </>
  );
};
