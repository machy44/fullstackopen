export const Search = ({ value, onChange }) => {
  return (
    <article>
      <strong>filter shown with</strong>
      <input value={value} onChange={onChange} />
    </article>
  );
};

export const Form = ({ onSubmit, children, title }) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>
          <Title>{title}</Title>
        </legend>
        {children}
      </fieldset>
      <button type="submit">add</button>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <>
      <span>{person.name}</span> <span>{person.number}</span>
    </>
  );
};

export const Persons = ({ persons }) => {
  return (
    <ol>
      {persons.map((person) => (
        <li>
          <Person key={person.name} person={person} />
        </li>
      ))}
    </ol>
  );
};

export const Title = ({ children }) => {
  return <h2>{children}</h2>;
};
