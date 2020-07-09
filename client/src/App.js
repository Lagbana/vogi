import axios from 'axios'
import React, { useEffect } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import VolunteerSignup from './pages/VolunteerSignup'
import PartnerSignup from './pages/PartnerSignup'
import VolunteerDashboard from './pages/VolunteerDashboard'
import PartnerDashboard from './pages/PartnerDashboard'
import { withUser, update } from './utils/withUser'

function App (props) {
  const { volunteer } = props

  useEffect(() => {
    axios
      .get('http://localhost:8080/v1/api/volunteer')
      .then(res => {
        update(res.data)
      })
      .catch(err => {
        if (err.response.status === 401) {
          update(null)
        }
      })
  }, [])

  return (
    <div className='App'>
      <Router>
        <Switch>
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
          <ProtectedRoute
            exact
            path='/volunteer/dashboard'
            component={() => <VolunteerDashboard volunteer={volunteer} />}
            {...props}
          />
          <Route exact path='/partner/dashboard'>
            <PartnerDashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default withUser(App)
