import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreateBlogForm } from './CreateBlogForm';


describe('<CreateBlogForm/>', () => {
  test('call on submit if data is valid', () => {
    const mockSubmit = jest.fn();
    const { container } = render(
      <CreateBlogForm handleSubmit={mockSubmit} />
    );

    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');

    fireEvent.change(titleInput, {
      target: { value: 'title' }
    });
    fireEvent.change(authorInput, {
      target: { value: 'author' }
    });
    fireEvent.change(urlInput, {
      target: { value: 'url' }
    });

    fireEvent.submit(screen.queryByTestId('create-blog-form'));

    expect(mockSubmit.mock.calls).toHaveLength(1);
    expect(mockSubmit.mock.calls[0][1]).toEqual({
      title: 'title',
      author: 'author',
      url: 'url'
    });
  });
});