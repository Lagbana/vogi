// Import React, useEffect and useState from react
import React, { useEffect, useState } from 'react'
// Import Components
import VolunteerDashboard from '../VolunteerDashboard'
import PartnerDashboard from '../PartnerDashboard'
// Import the userContext API
import UserContext from '../../utils/UserContext'
import API from '../../utils/API'

// User Dashboard Component
function UserDashboard () {
  // UseState hooks
  const [userRole, setUserRole] = useState()
  const [user, setUser] = useState('')
  // Component did mount life cycle for getting the userRole
  useEffect(() => {
    API.getUser().then(res => {
      setUserRole(res.data.role)
      setUser(res.data)
    })
  }, [])
  // Conditonally render the dashboard for different types of users
  const renderDashboard = () => {
    switch (userRole) {
      case 'Volunteer':
        return <VolunteerDashboard />
      case 'Partner':
        return <PartnerDashboard />
      default:
        return <div />
    }
  }
  return (
    <>
      <UserContext.Provider value={user}>
        {renderDashboard()}
      </UserContext.Provider>
    </>
  )
}
// Export the UserDashboard Component
export default UserDashboard
