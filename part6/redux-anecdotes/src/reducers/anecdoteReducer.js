import anecdoteService from '../services/anecdotes';

const VOTE = 'VOTE';
const ADD_NEW = 'ADD_NEW';
const INIT_ANECDOTES = 'INIT_ANECDOTES';

const reducer = (state = [], action) => {
  switch (action.type) {
    case VOTE: {
      const id = action.data.id;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote));
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

export const incrementVote = (id) => ({
  type: VOTE,
  data: {
    id,
  },
});

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_NOTE',
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
