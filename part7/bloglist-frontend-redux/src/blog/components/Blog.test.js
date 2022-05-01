import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogDetails } from './Blog';

const mockedBlog = {
  title: 'myths-about-useeffect',
  author: 'Kent C. Dodds',
  url: 'https://epicreact.dev/myths-about-useeffect',
  likes: 8,
  user: {
    username: 'machy',
    name: 'machy',
    id: '61a2636fca1d10a516d3a3e4'
  },
  id: '61b6575284f254e2cb88a4c6',
  comments: []
};

describe('<BlogDetails/>', () => {
  test('like button is executed', async () => {
    const mockHandleClick = jest.fn();
    render(
      <BlogDetails
        blog={mockedBlog}
        userCreatedBlog={false}
        handleLikeClick={mockHandleClick}
        handleDelete={jest.fn}
        handleCommentBlog={jest.fn}
      />
    );

    const likeButton = screen.getByText('like');

    userEvent.click(likeButton);
    userEvent.click(likeButton);

    await waitFor(() => {
      expect(mockHandleClick.mock.calls).toHaveLength(2);
    });
  });
});
