import React, { useState } from 'react'

import { CreateNew, About } from './pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,

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

const Anecdote = ({anecdote}) => {
  return <div>
  <h1>{anecdote.content}</h1>
  <h3>has {anecdote.votes}</h3>
  </div>
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
      <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>
        {anecdote.content}
        </Link>
        </li>)
      )}
    </ul>
  </div>
)



const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)


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

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
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

  const match = useRouteMatch('/anecdotes/:id');
  console.log({match});
    const anecdote = match     
    ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id))
    : null

  console.log({anecdote});

  return (
    <div>
      <h1>Software anecdotes</h1>
      
      <Menu />
      <Switch>
      <Route path="/anecdotes/:id" >
      <Anecdote anecdote={anecdote}/>
      </Route>
      <Route path="/create">
      <CreateNew addNew={addNew} />
      </Route>
      <Route path="/about">
      <About />
      </Route>
      <Route path="/">
       <AnecdoteList anecdotes={anecdotes} />
      </Route>
      </Switch>
      
      <Footer />
    </div>
  )
}

export default App;