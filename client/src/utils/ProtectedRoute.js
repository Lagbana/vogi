import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './auth'
// import AuthFailedPage from '../pages/AuthFailedPage'

function ProtectedRoute ({ component: Component, ...rest }) {
  // const isAuthenticated = useAuth()
  const isAuthenticated = localStorage.getItem('tokens')

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  )
}

export default ProtectedRoute

// import React from 'react'
// import { Route, Redirect } from 'react-router-dom'
// import { withUser } from './withUser'

// const ProtectedRoute = ({
//   component: Component,
//   user,
//   redirectTo,
//   ...rest
// }) => {
//   console.log({user, rest})

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         user === null ? (
//           <Redirect
//             to={{
//               pathname: redirectTo || '/login',
//               state: { from: props.location }
//             }}
//           />
//         ) : (
//           <Component {...{ ...props, user }} />
//         )
//       }
//     />
//   )
// }

// export default withUser(ProtectedRoute)
