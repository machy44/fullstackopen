const SET_FILTER = 'SET_FILTER';

const filterReducer = (state = '', action) => {
  switch (action.type) {
  case SET_FILTER:
    return action.data;
  default:
    return state;
  }
};

export const setFilter = (content) => ({
  type: SET_FILTER,
  data: content,
});

export default filterReducer;
