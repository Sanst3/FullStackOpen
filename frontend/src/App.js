import React, { useState, useEffect } from 'react'
import { Blogs, CreateBlog } from './components/Blog'
import { Login, Logout } from './components/Login'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import localUserUtil from './utils/localUser'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [formState, setFormState] = useState({ title: '', author: '', url: '' })
  const [notif, setNotif] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      localUserUtil.set(JSON.stringify(user), setUser)
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
        url: formState.url,
        user: localUserUtil.get().id
      })
      setNotif(`A new blog ${result.title} added`)
    } catch (e) {
      console.error('error', e.body)
    }
  }

  useEffect(() => {
    if (localUserUtil.get()) {
      const localUser = localUserUtil.get()
      setUser(localUser)
      blogService.setToken(localUser.token)
    }

    const getBlogs = async () => {
      const result = await blogService.getAll()
      setBlogs(result.sort((a, b) => a.likes - b.likes))
    }
    getBlogs()
  }, [])

  return user ?
    (
      <div>
        <h1>{notif}</h1>
        <h2>blogs</h2>
        <div><p>{localUserUtil.get().name} logged in</p> <Logout/></div>
        <Blogs blogs={blogs} username={user.username} />
        <Toggleable buttonLabel='create new blog'>
          <CreateBlog formState={formState} setFormState={setFormState} handlePost={handlePost}/>
        </Toggleable>
      </div>
    ) :
    (<div>
      <h1>{notif}</h1>
      <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
    </div>)
}

export default App