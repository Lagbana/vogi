// Import axios to set up API calls
import axios from 'axios'

export default {
  // Reset password email post request
  resetPasswordEmail: function ({ email }) {
    return axios.post('/v1/api/reset', { email })
  },
  // reset password post request
  resetPassword: function ({ token, password }) {
    return axios.post(`/v1/api/reset/${token}`, { password })
  },
  // Get the current user
  getUser: function () {
    return axios.get('/v1/api/users/')
  },
  // Update the user if they are a volunteer and their information
  updateVolunteer: function (volunteerData) {
    return axios.put('/v1/api/users/volunteer', volunteerData)
  },
  // Update the user if they are a partner and their information
  updatePartner: function (partnerData) {
    return axios.put('/v1/api/users/partner', partnerData)
  },
  // Log out and clear localstorage
  logOut: function () {
    localStorage.removeItem('tokens')
    localStorage.removeItem('role')
    return axios.delete('/v1/api/auth')
  },
  // Log in validation with the user credentials
  logIn: function (userCredentials) {
    return axios.post('/v1/api/auth/users', userCredentials)
  },
  // Create a new user post request
  createUser: function (userCredentials) {
    return axios.post('/v1/api/users', userCredentials)
  },
  // Create a new project
  createProject: function (projectData) {
    return axios.post('/v1/api/projects', projectData)
  },
  // Get all the available projects
  getAvailableProjects: function () {
    return axios.get('/v1/api/projects')
  },
  // Join an existing project
  joinProject: function (projectData) {
    return axios.put('/v1/api/projects', projectData)
  },
  // Delete a project
  deleteProject: function (data) {
    return axios.delete(`/v1/api/projects/${data._id}?repo=${data.repo}`)
  },
  // Add an issue post request
  addIssue: function (projectData) {
    return axios.post('/v1/api/projects/issues', projectData)
  },
  // Get all of the issue for a repository
  getAllIssues: function (repoName) {
    return axios.get(`/v1/api/projects/issues/?repo=${repoName}`)
  }
}
