// Import React, App.css, AntDesign and React-Route-Dom
import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Import the components
import ProtectedRoute from './utils/ProtectedRoute.js'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import UserDashboard from './pages/UserDashboard'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

function App () {
  return (
    <div className='App'>
      {/* <AuthContext.Provider value={true}> */}
      {/* <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}> */}
      {/* Client Side Routing with A switch and protected routes*/}
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
          <Route exact path='/forgot'>
            <ForgotPassword />
          </Route>
          <Route exact path='/reset/:token'>
            <ResetPassword />
          </Route>
          <ProtectedRoute
            exact
            path='/user/dashboard'
            component={UserDashboard}
          />
        </Switch>
      </Router>
      {/* </AuthContext.Provider> */}
    </div>
  )
}
// Export the application
export default App
