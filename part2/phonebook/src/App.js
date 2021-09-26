import React, { useState, useEffect } from "react";
import axios from "axios";
import { Title, Search, Form, Persons } from "./components";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPersons = async () => {
      const result = await axios.get("http://localhost:3001/persons");
      setPersons(result.data);
    };

    fetchPersons();
  }, []);

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
