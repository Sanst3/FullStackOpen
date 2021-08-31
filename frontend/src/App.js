import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Person = ({ person }) => {
  return (<p>{person.name} {person.number}</p>)
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((p) => (<Person key={p.name} person={p}/>))}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNo, setNewNo ] = useState('')
  const [ query, setNewQuery ] = useState('')

  const addName = (e) => {
    e.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNo }))
    }
  }

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNoChange = (e) => {
    setNewNo(e.target.value)
  }

  const handleQueryChange = (e) => {
    setNewQuery(e.target.value)
  }

  useEffect(() => {
    axios
    .get(`/api/persons`)
    .then(response => {
      setPersons(response.data)
    })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={query} onChange={handleQueryChange}/>
      </div>
      <div>debug: {newName}</div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNo} onChange={handleNoChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))} />
    </div>
  )
}

export default App