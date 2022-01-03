import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { Blog } from './Blog';

const mockedBlog = {
  'title': 'myths-about-useeffect',
  'author': 'Kent C. Dodds',
  'url': 'https://epicreact.dev/myths-about-useeffect',
  'likes': 8,
  'user': {
    'username': 'machy',
    'name': 'machy',
    'id': '61a2636fca1d10a516d3a3e4'
  },
  'id': '61b6575284f254e2cb88a4c6'
};


describe('<Blog/>', () => {
  test('render main info', () => {
    render( <Blog blog={mockedBlog} userCreatedBlog={false}
      handleLikeClick={jest.fn}
      handleDelete={jest.fn}
    />
    );
    expect(screen.queryByTestId('blog-main-info')).toBeVisible();
    expect(screen.queryByTestId('blog-details')).toBeNull();
  });
  test('render main info with details', () => {
    render( <Blog blog={mockedBlog} userCreatedBlog={false}
      handleLikeClick={jest.fn}
      handleDelete={jest.fn}
    />
    );
    fireEvent.click(screen.queryByTestId('toggle-visibility-button'));
    expect(screen.queryByTestId('blog-main-info')).toBeVisible();
    expect(screen.queryByTestId('blog-details')).toBeVisible();
  });
  test('like button is executed', () => {
    const mockHandleClick = jest.fn();
    render( <Blog blog={mockedBlog} userCreatedBlog={false}
      handleLikeClick={mockHandleClick}
      handleDelete={jest.fn}
    />);

    fireEvent.click(screen.queryByTestId('toggle-visibility-button'));


    const likeButton = screen.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandleClick.mock.calls).toHaveLength(2);
  });
});