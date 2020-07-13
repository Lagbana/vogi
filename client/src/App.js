import React, { useEffect, useState } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import VolunteerDashboard from './pages/VolunteerDashboard'
import PartnerDashboard from './pages/PartnerDashboard'
import { AuthContext } from './utils/auth'
import API from './utils/API'

function App () {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'))
  const [authTokens, setAuthTokens] = useState(existingTokens)
  const [user, setUser] = useState('Volunteer')

  const setTokens = data => {
    if (Object.keys(data).length > 0)
      localStorage.setItem('tokens', JSON.stringify(data))
    setAuthTokens(data)
  }

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (!localStorage.getItem('tokens')) {
      API.updateUser(role).then(res => {
        console.log(`😍 I got here fool`)
        setUser(res.data.role)
        return setTokens(res.data)
      })
    }
  }, [])

  const renderDashboard = () => {
    switch (user) {
      case 'Volunteer':
        return VolunteerDashboard
      case 'Partner':
        return PartnerDashboard
    }
  }

  return (
    <div className='App'>
      {/* <AuthContext.Provider value={true}> */}
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Landing />
            </Route>
            <Route exact path='/signup'>
              <SignUp />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <ProtectedRoute
              exact
              path='/user/dashboard'
              component={renderDashboard()}
            />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App
