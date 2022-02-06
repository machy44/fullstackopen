import React, { useEffect } from 'react';
import { NewNote, VisibilityFilter, Notes } from './components';
import { initializeNotes } from './reducers/noteReducer';
import { useDispatch } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  },[dispatch]);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;