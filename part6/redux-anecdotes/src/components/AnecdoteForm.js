import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewAnecdote } from '../reducers/anecdoteReducer';
import { hideNotification, showNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

export function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(showNotification(`you added "${content}"`));
    const newNote = await anecdoteService.createNew(content);
    dispatch(addNewAnecdote(newNote));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}
