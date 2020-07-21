import axios from 'axios'

export default {
  resetPassword: function () {
    return axios.post('/v1/api/reset')
  },
  getUser: function () {
    return axios.get('/v1/api/users/')
  },
  updateVolunteer: function (volunteerData) {
    return axios.put('/v1/api/users/volunteer', volunteerData)
  },
  updatePartner: function (partnerData) {
    return axios.put('/v1/api/users/partner', partnerData)
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
  },

  deleteProject: function (data) {
    return axios.delete(`/v1/api/projects/${data._id}?repo=${data.repo}`)
  },

  addIssue: function (projectData) {
    return axios.post('/v1/api/projects/issues', projectData)
  },

  getAllIssues: function (repoName) {
    return axios.get(`/v1/api/projects/issues/?repo=${repoName}`)
  }
}
