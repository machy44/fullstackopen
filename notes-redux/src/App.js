import React, { useEffect } from 'react';
import { NewNote, VisibilityFilter, Notes } from './components';
import { initializeNotes } from './reducers/noteReducer';
import { useDispatch } from 'react-redux';
import noteService from './services/notes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then(notes =>
      dispatch(initializeNotes(notes)));
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;