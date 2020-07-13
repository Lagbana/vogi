import axios from 'axios'
// import { json } from 'body-parser'

export default {
  updateUser: function (role) {
    return axios.put(`/v1/api/users/?role=${role}`)
  },

  logOut: function () {
    localStorage.removeItem('tokens')
    localStorage.removeItem('role')
    return axios.delete('/v1/api/auth')
  },

  logIn: function (userCredentials) {
    return axios.post('/v1/api/auth/users', userCredentials)
  },

  createUser: function (userCredentials) {
    return axios.post('/v1/api/users', userCredentials)
  }

}
