import { DeleteButton } from "./buttons";
export { Notification } from "./Notification";

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

export const Persons = ({ persons, handleDelete }) => {
  return (
    <ol>
      {persons.map((person) => (
        <li key={person.name}>
          <Person person={person} />
          <DeleteButton handleClick={() => handleDelete(person.id)} />
        </li>
      ))}
    </ol>
  );
};

export const Title = ({ children }) => {
  return <h2>{children}</h2>;
};
