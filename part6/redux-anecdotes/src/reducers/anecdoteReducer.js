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

export const addNewAnecdote = (data) => ({
  type: ADD_NEW,
  data,
});

export const initializeAnecdotes = (notes) => {
  return {
    type: INIT_ANECDOTES,
    data: notes,
  };
};

export default reducer;
