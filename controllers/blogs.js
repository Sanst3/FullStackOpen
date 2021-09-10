const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const logger = require('../utils/logger')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('author')

  res.json(blogs)
})


blogRouter.post('/', async (req, res) => {
  const body = req.body
  const token = req.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    logger.info('HERE')
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (user === null) logger.error('NO USER FOUND')

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: decodedToken.id,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

module.exports = blogRouter