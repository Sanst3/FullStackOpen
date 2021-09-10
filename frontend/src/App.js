import React, { useState, useEffect } from 'react'
import { Blog, CreateBlog } from './components/Blog'
import { Login, Logout } from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const getLocalUser = () => {
  return JSON.parse(window.localStorage.getItem('loggedInUser'))
}

const setLocalUser = (newUser, setUser) => {
  window.localStorage.setItem('loggedInUser', newUser)
  setUser(newUser)
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [formState, setFormState] = useState({title: '', author: '', url: ''})
  const [notif, setNotif] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setLocalUser(JSON.stringify(user), setUser)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (e) {
      setNotif('Wrong username or password')
      console.log('GOTTEM', e)
    }
  }

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      const result = await blogService.postBlog({
        title: formState.title,
        author: formState.author,
        url: formState.url
      })
      setBlogs(blogs.concat({
        author: result.author,
        title: result.title,
        url: result.url,
        id: result.id
      }))
      setNotif(`A new blog ${result.title} added`)
    } catch (e) {
      console.error("ERROR", e.body)
    }
  }

  useEffect(() => {
    if (getLocalUser()) {
      const localUser = getLocalUser()
      setUser(localUser)
      blogService.setToken(localUser.token)
    }

    const getBlogs = async () => {
      const result = await blogService.getAll()
      setBlogs( result )
    }
    getBlogs()
  }, [])

  return user ? (
    <div>
      <h1>{notif}</h1>
      <h2>blogs</h2>
      <div><p>{getLocalUser().name} logged in</p> <Logout/></div>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}
    <CreateBlog formState={formState} setFormState={setFormState} handlePost={handlePost}/>
    </div>
  ) :
  <div>
    <h1>{notif}</h1>
    <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
  </div>
  

}

export default App