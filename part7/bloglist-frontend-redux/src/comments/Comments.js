import React from 'react';
import { UnorderedList, ListItem, Heading, Button, Form, FormInput, Flex } from 'ui';
import * as yup from 'yup';
import { Box } from '@chakra-ui/react';

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
            <Flex
              align="flex-end"
              justifyContent="space-between"
              direction={{
                base: 'column',
                md: 'row'
              }}>
              <Box w={['100%', '75%']}>
                <FormInput id="comment" labelText="text" error={errors.username} {...register('comment')} />
              </Box>
              <Box w={['100%', '20%']} mt={[4, 0]}>
                <Button
                  data-testid="comment-submit"
                  type="submit"
                  isLoading={isSubmitting}
                  width="full"
                  disabled={!!errors.comment}>
                  add comment
                </Button>
              </Box>
            </Flex>
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
