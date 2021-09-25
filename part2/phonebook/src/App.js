import React, { useState } from "react";
import { Title, Search, Form, Persons } from "./components";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const handlePhoneChange = (e) => setPhoneNumber(e.target.value);

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName, number: phoneNumber }]);
    setNewName("");
    setPhoneNumber("");
  };

  const personsDisplay = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <main>
      <Title>Phonebook</Title>
      <Search value={searchTerm} onChange={handleSearchTermChange} />
      <Form onSubmit={handleAddPerson} title="Add New">
        <>
          <label for="name">name: </label>
          <input id="name" value={newName} onChange={handleNameChange} />
          <br />
          <br />
          <label for="phone">phone:</label>
          <input id="phone" value={phoneNumber} onChange={handlePhoneChange} />
        </>
      </Form>
      <Title>Numbers</Title>
      <Persons persons={personsDisplay} />
    </main>
  );
};

export default App;
