const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// eslint-disable-next-line no-unused-vars
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blog are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('uid property is id', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body[0]._id).toBeDefined()
})

test('posting a blog successfully creates one in db', async () => {
  const newBlog = helper.newBlog

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const endBlogs = await helper.blogsInDb()
  expect(endBlogs).toHaveLength(helper.initialBlogs.length + 1)

  const contents = endBlogs.map(b => b.name)
  expect(contents).toContain(helper.newBlog.name)
})

test('posting a blog without likes will default likes to 0', async () => {
  const newBlog = {
    title: 'D',
    author: 'Peter',
    url: 'www.peter.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect({
      title: 'D',
      author: 'Peter',
      url: 'www.peter.com',
      likes: 0
    })
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})