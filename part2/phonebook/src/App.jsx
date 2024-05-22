import { useState } from 'react'

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

  const handleSearch = (event) => {
    setQuery(event.target.value)
  }

  const personsToShow = persons.filter(person => {
    return person.name.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <input
        value={query}
        onChange={handleSearch}
      />
      <h2>add a new</h2>
      <form>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
          <br />
          number:
          <input
            value={newPhone}
            onChange={handlePhoneChange}
          />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => {
        return <p key={person.id}>{person.name} {person.number}</p>
      })}
    </div>
  )
}

export default App