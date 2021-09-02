const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/note')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('body', (request, response) => JSON.stringify(response.locals.person))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

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

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!Object.prototype.hasOwnProperty.call(body, 'name') ||
  !Object.prototype.hasOwnProperty.call(body, 'number')) {
    return response.status(400).json({
      error: 'missing properties'
    })
  }

  const personObj = {
    name: body.name,
    number: body.number
  }
  const person = new Person(personObj)

  person
    .save()
    .then(savedPerson => {
      console.log('SavedPerson = ' + savedPerson)
      response.json(savedPerson)
    })
    .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})