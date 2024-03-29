import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function Anecdote({ anecdote, handleClick, dataTestId = '' }) {
  return (
    <div data-testid={dataTestId}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button data-testid={`${dataTestId}-vote-button`} onClick={handleClick}>
          vote
        </button>
      </div>
    </div>
  );
}

export function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(state.filter.toLowerCase());
      });
    }
    return state.anecdotes;
  });
  const dispatch = useDispatch();

  const handleClick = (id, content) => {
    dispatch(incrementVote(id));
    dispatch(setNotification(`you voted '${content}'`, 5));
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote, index) => (
          <Anecdote
            dataTestId={`anecdote-${index}`}
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleClick(anecdote.id, anecdote.content)}
          />
        ))}
    </>
  );
}
