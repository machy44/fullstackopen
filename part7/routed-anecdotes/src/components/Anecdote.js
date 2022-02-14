import { Link } from 'react-router-dom';

export const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>
        {anecdote.content} by {anecdote.author}
      </h1>
      <h3>has {anecdote.votes} votes</h3>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);
