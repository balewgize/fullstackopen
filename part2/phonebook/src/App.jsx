import { useState } from 'react'


const Filter = ({ query, handleSearch }) => {
  return (
    <div>
      filter shown with <input value={query} onChange={handleSearch} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name:
        <input
          value={props.newName}
          onChange={props.handleNameChange}
        />
        <br />
        number:
        <input
          value={props.newPhone}
          onChange={props.handlePhoneChange}
        />
      </div>
      <div>
        <button type="submit" onClick={props.addPerson}>add</button>
      </div>
    </form>
  )
}

const Person = ({ person }) => <div>{person.name} {person.number}</div>

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [query, setQuery] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearch = (event) => {
    setQuery(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const isNameAdded = persons.find(person => person.name === newName)
    if (isNameAdded) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newPhone, id: persons.length + 1 }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhone('')
  }

  const personsToShow = persons.filter(person => {
    return person.name.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        query={query}
        handleSearch={handleSearch}
      />

      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons
        personsToShow={personsToShow}
      />
    </div>
  )
}

export default App