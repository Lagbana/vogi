import axios from 'axios'
// import { json } from 'body-parser'

export default {
  getUser: function () {
    return axios.get('/v1/api/user')
  },

  logOut: function () {
    localStorage.removeItem('tokens')
    return axios.delete('/v1/api/auth')
  },

  createUser: function (volunteerData) {
    return axios.post('/v1/api/users', volunteerData)
  },
  createProject: function (projectData) {
    return axios.post('/v1/api/projects', projectData)
  },
  getProjects: function () {
    return axios.get('/v1/api/projects')
  }
}
