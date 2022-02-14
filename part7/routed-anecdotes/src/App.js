import React, { useState } from 'react'

import { CreateNew, About } from './pages';
import {Notification, Anecdote, AnecdoteList} from "./components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useMatch,
} from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>anecdotes</Link>
      <Link to="/create"style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  )
}



const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

let timerId;

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('');


  const manageNotification = (content) => {
    setNotification(`${content} created`);
    if(timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      setNotification("")
    }, 5000)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote))
    manageNotification(anecdote.content)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id');
  console.log({match});
    const anecdote = match     
    ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id))
    : null

  console.log({anecdote});


  return (
    <div>
      <h1>Software anecdotes</h1>
      
      <Menu />
      <Notification content={notification}/>
      <Routes>
      <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote}/>} />
      <Route path="/create" element={<CreateNew addNew={addNew} />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App;