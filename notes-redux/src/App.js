import {createStore} from "redux"
import { noteReducer } from "./reducers/noteReducer"


const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

const generateId = () =>
Math.floor(Math.random() * 1000000)

const App = () => {
const addNote = (event) => {
  event.preventDefault()
  const content = event.target.note.value
  event.target.note.value = ''
  store.dispatch(createNote(content))
}

const toggleImportance = (id) => {
  store.dispatch(toggleImportanceOf(id))
}

return (
  <div>
    <form onSubmit={addNote}>
      <input name="note" /> 
      <button type="submit">add</button>
    </form>
    <ul>
      {store.getState().map(note =>
        <li
          key={note.id} 
          onClick={() => toggleImportance(note.id)}
        >
          {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>
      )}
    </ul>
  </div>
)
}

export default App;