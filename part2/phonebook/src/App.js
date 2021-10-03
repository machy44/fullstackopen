import React, { useState, useEffect } from "react";
import { Title, Search, Form, Persons } from "./components";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPersons = async () => {
      setPersons(await personService.getAll());
    };
    fetchPersons();
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const handlePhoneChange = (e) => setPhoneNumber(e.target.value);

  const handleAddPerson = (e) => {
    e.preventDefault();
    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (personExists) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (result === false) return;
      return personService
        .update(personExists.id, {
          name: newName,
          number: phoneNumber,
        })
        .then((returnedPerson) => {
          const updatedPersons = persons.map((person) =>
            person.id === returnedPerson.id
              ? { ...person, number: returnedPerson.number }
              : person
          );
          setPersons(updatedPersons);
          setNewName("");
          setPhoneNumber("");
        });
    }
    personService
      .create({
        name: newName,
        number: phoneNumber,
      })
      .then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setPhoneNumber("");
      });
  };

  const handleDeletePerson = async (id) => {
    const affectedPerson = persons.find((person) => person.id === id);
    const result = window.confirm(`Delete ${affectedPerson.name} ?`);
    if (result === false) return;
    await personService.delete(id);
    setPersons(persons.filter((person) => person.id !== id));
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
          <label htmlFor="name">name: </label>
          <input id="name" value={newName} onChange={handleNameChange} />
          <br />
          <br />
          <label htmlFor="phone">phone:</label>
          <input id="phone" value={phoneNumber} onChange={handlePhoneChange} />
        </>
      </Form>
      <Title>Numbers</Title>
      <Persons persons={personsDisplay} handleDelete={handleDeletePerson} />
    </main>
  );
};

export default App;
