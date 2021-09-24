import React from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Total = ({ parts }) => {
  const sum = parts.reduce(
    (prevValue, currValue) => prevValue + currValue.exercises,
    0
  );
  return <p>total of {sum} exercises </p>;
};

const Part = ({ name, exercise }) => (
  <p>
    {name} {exercise}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercise={part.exercises} />
      ))}
    </div>
  );
};

export const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
