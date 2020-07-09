import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import VolunteerSignup from './pages/VolunteerSignup'
import PartnerSignup from './pages/PartnerSignup'
import VolunteerDashboard from './pages/VolunteerDashboard'
import PartnerDashboard from './pages/PartnerDashboard'

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
        <Route exact path='/partner/dashboard'>
          <PartnerDashboard />
        </Route>
        <Route exact path='/volunteer/dashboard'>
          <VolunteerDashboard />
        </Route>
      </Router>
    </div>
  )
}

export default App
