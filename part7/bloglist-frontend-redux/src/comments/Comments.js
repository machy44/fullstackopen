import React from 'react';
import { Grid, GridItem, Spacer } from '@chakra-ui/react';
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
            <Grid templateColumns="2fr 1fr" gap={4}>
              <GridItem>
                <FormInput id="comment" labelText="text" error={errors.username} {...register('comment')} />
              </GridItem>
              <GridItem>
                <Spacer />
                <Button
                  data-testid="comment-submit"
                  type="submit"
                  isLoading={isSubmitting}
                  width="full"
                  disabled={!!errors.comment}>
                  add comment
                </Button>
              </GridItem>
            </Grid>
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
