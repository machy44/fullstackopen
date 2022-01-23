import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer';

function Anecdote({ anecdote, handleClick }) {
  return <>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </>
}

export function Anecdotes() {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(incrementVote(id))
  }


  return (<>
    {anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => {
          vote(anecdote.id)
        }}
      />)}
  </>)
}

