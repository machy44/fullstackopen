import anecdoteService from '../services/anecdotes';

const VOTE = 'VOTE';
const ADD_NEW = 'ADD_NEW';
const INIT_ANECDOTES = 'INIT_ANECDOTES';

const incrementAnecdoteVote = (id, anecdotes) => {
  const anecdoteToChange = anecdotes.find((n) => n.id === id);
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1,
  };
  return changedAnecdote;
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case VOTE: {
      const changedAnecdote = action.data;
      return state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote,
      );
    }
    case ADD_NEW: {
      return [...state, action.data];
    }
    case INIT_ANECDOTES:
      return action.data;
    default:
      return state;
  }
};

export const incrementVote = (id) => {
  return async (dispatch, getState) => {
    const changedAnecdote = incrementAnecdoteVote(id, getState().anecdotes);
    const { data } = await anecdoteService.update(changedAnecdote);
    dispatch({
      type: VOTE,
      data,
    });
  };
};

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: ADD_NEW,
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: INIT_ANECDOTES,
      data: anecdotes,
    });
  };
};

export default reducer;
