import React, { useState } from "react";

const getRandomInt = (max) => () => {
  return Math.floor(Math.random() * max);
};

const Section = ({ title, children }) => {
  return (
    <section>
      <h1>{title}</h1>
      {children}
    </section>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const randomIntMax7 = getRandomInt(7);

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));

  const getAnecdote = (anecdoteNumber) => () => setSelected(anecdoteNumber);
  const handleVote = () => {
    const copyOfPoints = [...points];
    copyOfPoints[selected] += 1;
    setPoints(copyOfPoints);
  };

  const mostVotesNumber = Math.max(...points);
  const mostPointsIndex = points.indexOf(mostVotesNumber);

  return (
    <main>
      <Section title="Anecdote of the day">
        <div>{anecdotes[selected]}</div>
        <button onClick={handleVote}>vote</button>
        <button onClick={getAnecdote(randomIntMax7)}>next anecdote</button>
        <p>has {points[selected]} votes</p>
      </Section>
      <Section title="Anecdote with most votes">
        <p>{anecdotes[mostPointsIndex]}</p>
        <p>has {mostVotesNumber} votes</p>
      </Section>
    </main>
  );
};

export default App;
