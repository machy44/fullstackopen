import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementVote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

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
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(incrementVote(id));
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
            handleClick={() => {
              vote(anecdote.id);
              dispatch(showNotification(anecdote.content));
            }}
          />
        ))}
    </>
  );
}
