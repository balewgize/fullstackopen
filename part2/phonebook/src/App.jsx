/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { getAll, createPerson, updatePerson, deletePerson } from './services/phonebook'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

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

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      <span>{person.name} {person.number} </span>
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person key={person.id} person={person} handleDelete={handleDelete} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [query, setQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newPhone }
        updatePerson(person.id, changedPerson)
          .then(data => {
            setPersons(persons.map(person => person.id !== data.id ? person : data))

            setSuccessMessage(`Number changed for ${newName}`)

            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)

            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
          })

        setNewName('')
        setNewPhone('')
      }
      return
    }

    const newPerson = { name: newName, number: newPhone }
    createPerson(newPerson)
      .then(data => {
        setPersons(persons.concat(data))

        setSuccessMessage(`Added ${newName}`)

        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })

    setNewName('')
    setNewPhone('')
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    }
  }

  const personsToShow = persons.filter(person => {
    return person.name.toLowerCase().includes(query.toLowerCase())
  })

  useEffect(() => {
    getAll()
      .then(data => setPersons(data))
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} type={'error'} />
      <Notification message={successMessage} type={'success'} />

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
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App