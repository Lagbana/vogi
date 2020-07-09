import axios from 'axios'
// import { json } from 'body-parser'

export default {
  // githubAuth: async function () {
  //   const isAuthenticated = localStorage.getItem('volunteer')

  //   if (!isAuthenticated) {
  //     let url = 'http://localhost:8080/v1/api/volunteer'
  //     // let url = 'http://www.vogi.ca/v1/api/volunteer' // production build

  //     let options = {
  //       method: 'GET',
  //       url: url,
  //       headers: {
  //         Accept: 'application/json',
  //         ContentType: 'application/json;charset=UTF-8'
  //       }
  //     }
  //     const response = await axios.get(options)
  //     const responseOK =
  //       response && response.status === 200 && response.statusText === 'OK'
  //     if (responseOK) {
  //       let data = await response.data
  //       console.log(`😆 data was received as ${data}`)
  //       localStorage.setItem('volunteer', JSON.stringify(data))
  //     }
  //   }
  //   return isAuthenticated
  // },

  getPartner: function () {
    return axios.get('/api/partners')
  },

  savePartner: function (partnerData) {
    return axios.post('/api/partners', partnerData)
  },
  getVolunteer: function () {
    return axios.get('/api/volunteers')
  },

  saveVolunteer: function (volunteerData) {
    return axios.post('/api/volunteers', volunteerData)
  }
}
