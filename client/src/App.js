import React from 'react'
import logo from './logo.svg'
import './App.css'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import VolunteerSignup from './pages/VolunteerSignup'
import PartnerSignup from './pages/PartnerSignup'

function App () {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/signup/volunteer'>
          <VolunteerSignup />
        </Route>
        <Route exact path='/signup/partner'>
          <PartnerSignup />
        </Route>
      </Router>
    </div>
  )
}

export default App
