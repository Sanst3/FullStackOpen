import React, { useState } from 'react'

const Names = ({ names }) => {
  return (
    <div>
      {names.map((n) => (<p key={n.name}>{n.name}</p>))}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (e) => {
    e.preventDefault()
    setPersons(persons.concat({ name: newName }))
  }

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names names={persons} />
    </div>
  )
}

export default App