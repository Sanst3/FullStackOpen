const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'A',
    author: 'Bob',
    url: 'www.bob.com',
    likes: 1,
  },
  {
    title: 'B',
    author: 'John',
    url: 'www.john.com',
    likes: 2,
  },
]

const newBlog = {
  title: 'C',
  author: 'Paul',
  url: 'www.paul.com',
  likes: 3,
}

const nonExistingId = async () => {
  const blog = new Blog({ name: 'toberemoved', number: 'testnumber' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  console.log(blogs)
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  newBlog,
  nonExistingId,
  blogsInDb
}