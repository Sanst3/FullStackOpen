require('dotenv').config()

const BASEURL = process.env.NODE_ENV === 'production' ?
  '/api' :
  'http://localhost:3003/api'

module.exports = {
  BASEURL
}