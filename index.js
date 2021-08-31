const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/note')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('body', (request, response) => JSON.stringify(response.locals.person))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

const toObjectId = id => mongoose.Types.ObjectId(id)

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {
  Person.countDocuments({}, (err, count) => {
    const date = new Date()
    response.send(`Phonebook has info for ${count} people<br>${date}`)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(toObjectId(id)).then(person => {
    console.log("here")
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(toObjectId(id)).then(result => {
    console.log(result)
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.hasOwnProperty('name') || !body.hasOwnProperty('number')) {
    return response.status(400).json({
      error: 'missing properties'
    })
  }
  
  // TODO check duplicates
  // Person.find({name: body.name}).then(response => {

  // })

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})