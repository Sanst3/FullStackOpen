const userRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})

  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const body = req.body

  if (!Object.prototype.hasOwnProperty.call(body, 'name') ||
  !Object.prototype.hasOwnProperty.call(body, 'username') ||
  !Object.prototype.hasOwnProperty.call(body, 'password') ||
  body.password.length < 3) {
    return res.status(400).send({ error: 'invalid username or password' })
  }

  const saltRounds = 10
  const pwHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    pwHash: pwHash
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

userRouter.post('/login', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.pwHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = userRouter