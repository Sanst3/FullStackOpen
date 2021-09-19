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

const Error = ({ error }) => {
  if (error) {
    return (
      <div border-color='red'>{error}</div>
    )
  } else {
    return null
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNo, setNewNo ] = useState('')
  const [ query, setNewQuery ] = useState('')
  const [ error, setError ] = useState('')

  const addName = (e) => {
    e.preventDefault()
    axios
      .post('/api/persons', { name: newName, number: newNo })
      .then((res) => {
        console.log("RES: ", res)
        refreshPersons()
      })
      .catch(err => setError(err.response.data.error))

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

  const refreshPersons = () => {
    axios
      .get('/api/persons')
      .then(res => setPersons(res.data))
      .catch(err => console.log("ERROR IN REFRESH: " + err))
  }

  useEffect(() => {
    refreshPersons()
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Error error={error}/>
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