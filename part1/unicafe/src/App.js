import React, { useState } from "react";
import { Statistics } from "./Statistics";

const Button = ({ handleClick, children }) => {
  return <button onClick={handleClick}>{children}</button>;
};

const Feedback = ({ children }) => {
  return (
    <section>
      <h1>give feedback</h1>
      {children}
    </section>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <main>
      <Feedback>
        <Button handleClick={() => setGood((c) => c + 1)}>good</Button>
        <Button handleClick={() => setNeutral((c) => c + 1)}>neutral</Button>
        <Button handleClick={() => setBad((c) => c + 1)}>bad</Button>
      </Feedback>
      {[good, neutral, bad].every((element) => element === 0) ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </main>
  );
};

export default App;
