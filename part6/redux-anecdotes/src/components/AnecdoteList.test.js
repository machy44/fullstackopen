import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { AnecdoteList } from './AnecdoteList';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import anecdoteReducer from '../reducers/anecdoteReducer';
import { render, screen, fireEvent } from '@testing-library/react';

function renderWithRedux(ui, { store = createStore(anecdoteReducer), ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('<AnecdoteList/>', () => {
  test('anecdotes are sorted by number of votes', () => {
    const { container } = renderWithRedux(<AnecdoteList />);

    const anecdote5VoteButton = screen.getByTestId('anecdote-5-vote-button');
    const anecdote4VoteButton = screen.getByTestId('anecdote-4-vote-button');
    fireEvent.click(anecdote5VoteButton);
    fireEvent.click(anecdote5VoteButton);
    fireEvent.click(anecdote4VoteButton);
    const reorderedAnecdote1 = container.querySelector('[data-testid=anecdote-0]');
    expect(reorderedAnecdote1).toHaveTextContent('Debugging is twice as hard as writing');
    const reorderedAnecdote2 = container.querySelector('[data-testid=anecdote-1]');
    expect(reorderedAnecdote2).toHaveTextContent('Premature optimization is the root of all evil');
  });
});
