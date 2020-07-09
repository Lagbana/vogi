import axios from 'axios'

export default {
  // Gets all books
  getPartner: function () {
    return axios.get('/api/partners')
  },
  // Saves a book to the database
  savePartner: function (partnerData) {
    return axios.post('/api/partners', partnerData)
  },
  getVolunteer: function () {
    return axios.get('/api/volunteers')
  },
  // Saves a book to the database
  saveVolunteer: function (volunteerData) {
    return axios.post('/api/volunteers', volunteerData)
  }
}
