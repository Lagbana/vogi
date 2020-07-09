import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withUser } from './withUser'

const ProtectedRoute = ({
  component: Component,
  volunteer,
  redirectTo,
  ...rest
}) => {
  console.log({volunteer, rest})

  return (
    <Route
      {...rest}
      render={props =>
        volunteer === null ? (
          <Redirect
            to={{
              pathname: redirectTo || '/login',
              state: { from: props.location }
            }}
          />
        ) : (
          <Component {...{ ...props, volunteer }} />
        )
      }
    />
  )
}

export default withUser(ProtectedRoute)
