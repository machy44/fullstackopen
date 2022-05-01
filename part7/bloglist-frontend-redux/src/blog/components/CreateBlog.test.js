import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import userEvent from '@testing-library/user-event';
import { CreateBlogForm } from './CreateBlog';

export const ThemeWrapper = ({ children }) => <ChakraProvider>{children}</ChakraProvider>;

describe('<CreateBlogForm/>', () => {
  test('call on submit if data is valid', async () => {
    const mockSubmit = jest.fn();
    render(<CreateBlogForm handleSubmit={mockSubmit} />);

    const title = screen.getByTestId('title');
    const author = screen.getByTestId('author');
    const url = screen.getByTestId('url');

    fireEvent.change(title, {
      target: { value: 'title' }
    });
    fireEvent.change(author, {
      target: { value: 'author' }
    });
    fireEvent.change(url, {
      target: { value: 'http://url.com' }
    });

    expect(title.value).toBe('title');
    expect(author.value).toBe('author');
    expect(url.value).toBe('http://url.com');

    expect(screen.queryByTestId('new-blog-form-submit')).toBeTruthy();

    userEvent.click(screen.getByText('create'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit.mock.calls[0][0]).toEqual({
        title: 'title',
        author: 'author',
        url: 'http://url.com'
      });
    });
  });
  // test('invalid username', () => {});
  // test('invalid password', () => {});
});
