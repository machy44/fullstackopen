import React, { useState, useEffect } from "react";
import { Title, Search, Form, Persons, Notification } from "./components";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchPersons = async () => {
      setPersons(await personService.getAll());
    };
    fetchPersons();
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleSearchTermChange = (e) => setSearchTerm(e.target.value);

  const handlePhoneChange = (e) => setPhoneNumber(e.target.value);

  const resetPersonInputs = () => {
    setNewName("");
    setPhoneNumber("");
  };

  const resetSuccessMessageTimeout = () => {
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const setupError = (newName) => {
    setErrorMessage(
      `Information of ${newName} has already been removed from server`
    );
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    setPersons(
      persons.filter(
        (person) => person.name.toLowerCase() !== newName.toLowerCase()
      )
    );
  };

  const handleAddPerson = async (e) => {
    e.preventDefault();
    try {
      const personExists = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );
      if (personExists) {
        const result = window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        );
        if (result === false) return;
        const returnedPerson = await personService.update(personExists.id, {
          name: newName,
          number: phoneNumber,
        });

        const updatedPersons = persons.map((person) =>
          person.id === returnedPerson.id
            ? { ...person, number: returnedPerson.number }
            : person
        );
        setPersons(updatedPersons);
        resetPersonInputs();

        setSuccessMessage(
          `Updated number of ${returnedPerson.name} to ${returnedPerson.number}`
        );
        resetSuccessMessageTimeout();

        return;
      }

      const returnedPerson = await personService.create({
        name: newName,
        number: phoneNumber,
      });

      setPersons([...persons, returnedPerson]);
      resetPersonInputs();
      setSuccessMessage(`Added ${newName}`);
      resetSuccessMessageTimeout();
    } catch (e) {
      setupError(newName);
    }
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
      <Notification message={successMessage} className="success" />
      <Notification message={errorMessage} className="error" />
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
