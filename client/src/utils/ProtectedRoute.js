import React from 'react'
import { Route, Redirect} from 'react-router-dom'
// import { useAuth } from './auth'
// import AuthFailedPage from '../pages/AuthFailedPage'

function ProtectedRoute ({ component: Component, ...rest }) {
  // function ProtectedRoute (props) {
  //   // const isAuthenticated = useAuth()
  //  const { component: Component, path} = props
  const isAuthenticated = localStorage.getItem('tokens')
  return (
    // <Route exact path={path}>
    //    {props =>
    //     isAuthenticated !== null ? (
    //       <Component {...props} />
    //     ) : (
    //       <Redirect to='/login' />
    //     )
    //   }
    // </Route>
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated !== null ? <Component {...props} /> : <Redirect to='/login' />  }
    />
  )
}

export default ProtectedRoute
