const log = () => (next) => (action) => {
  console.log('ACTION: ', action.type, action);
  next(action);
};

export const logsMdl = [log];
