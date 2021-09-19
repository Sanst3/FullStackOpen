const get = () => {
  return JSON.parse(window.localStorage.getItem('loggedInUser'))
}

const set = (newUser, setUser) => {
  window.localStorage.setItem('loggedInUser', newUser)
  setUser(newUser)
}

export default {
  get, set
}