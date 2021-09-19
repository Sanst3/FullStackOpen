import axios from 'axios'
const config = require('../utils/config')

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const dropToken = () => {
  token = null
}

// Posts blog of form { title, author, url }
const postBlog = (newBlog) => {
  const request = axios.post(`${config.BASEURL}/blogs`, newBlog, { headers: { 'Authorization': token } })
  return request.then(response => response.data)
    .catch(err => {console.log(err)})
}

const putBlog = async (id, updatedBlog) => {
  try {
    const result = await axios.put(`${config.BASEURL}/blogs/${id}`, updatedBlog)
    return result.data
  } catch (e) {
    console.error(e)
  }
}

const delBlog = async (id) => {
  try {
    const result = await axios.delete(`${config.BASEURL}/blogs/${id}`)
    return result.data
  } catch (e) {
    console.error(e)
  }
}

const getAll = () => {
  const request = axios.get(`${config.BASEURL}/blogs`)
  return request.then(response => response.data)
}

export default { setToken, dropToken, getAll, postBlog, putBlog, delBlog }