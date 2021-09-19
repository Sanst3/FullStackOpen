import axios from 'axios'
const config = require('../utils/config')


// takes in an object with keys username and password
// returns an object with keys username, name, id
const login = async credentials => {
  const res = await axios.post(`${config.BASEURL}/users/login`, credentials)
  return res.data
}

export default { login }