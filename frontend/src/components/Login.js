import propTypes from 'prop-types'
import PropTypes from 'prop-types'
import React from 'react'

const Login = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>username <input type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)}></input></div>
        <div>password <input type="password" name="Username" value={password} onChange={({ target }) => setPassword(target.value)}></input></div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const Logout = () => {
  return (
    <button onClick={() => {window.localStorage.removeItem('loggedInUser'); window.location.reload()}}>Log out</button>
  )
}

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: propTypes.func.isRequired
}

export {
  Login, Logout
}