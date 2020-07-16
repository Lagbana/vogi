import axios from 'axios'

export default {
  getUser: function () {
    return axios.get('/v1/api/users/')
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
  },

  createProject: function (projectData) {
    return axios.post('/v1/api/projects', projectData)
  },
  getAvailableProjects: function () {
    return axios.get('/v1/api/projects')
  },
  joinProject: function (projectData) {
    return axios.put('/v1/api/projects', projectData)
  }
}
