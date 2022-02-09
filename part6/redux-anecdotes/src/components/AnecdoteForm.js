import React from 'react';
import { connect } from 'react-redux';
import { addNewAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

export function AnecdoteForm(props) {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.addNewAnecdote(content);
    props.setNotification(`you added "${content}"`, 5);
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

export default connect(null, { addNewAnecdote, setNotification })(AnecdoteForm);
