import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, username, likeHandler }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(blog)

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const delHandler = () => {
    const res = window.confirm(`Remove blog ${blog.title}`)
    if (res) {
      console.log(blog.id)
      blogService.delBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div className='blogToggleable' style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blog.likes}</p><button onClick={likeHandler}>like</button>
        <p>{blog.user.username}</p>
        {blog.user.username === username &&
          <button onClick={delHandler}>remove</button>
        }
      </div>
    </div>
  )
}

const Blogs = ({ blogs, username }) => {
  return (
    <>
      {blogs.map(blog => {
        const likeHandler = () => {
          const newBlog = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
          }
          blogService.putBlog(blog.id, newBlog)
        }

        return <Blog key={blog.id} blog={blog} username={username} likeHandler={likeHandler} />
      })}
    </>
  )
}

const CreateBlog = ({ formState, setFormState, handlePost }) => {
  const handleInputChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setFormState({
      ...formState, [name]: value
    })
  }

  return (<div>
    <h1>Create New</h1>
    <form onSubmit={handlePost}>
      <div>title: <input id="title" type="text" name="title" value={formState.title} onChange={handleInputChange}/></div>
      <div>author: <input id="author" type="text" name="author" value={formState.author} onChange={handleInputChange}/></div>
      <div>url: <input id="url" type="text" name="url" value={formState.url} onChange={handleInputChange}/></div>
      <button type="submit">submit</button>
    </form>
  </div>)
}

export {
  Blog, Blogs, CreateBlog
}