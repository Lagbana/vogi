import React, { useEffect, useState } from 'react'
import VolunteerDashboard from '../VolunteerDashboard'
import PartnerDashboard from '../PartnerDashboard'
import UserContext from '../../utils/UserContext'
import API from '../../utils/API'

function UserDashboard () {
  const [userRole, setUserRole] = useState()
  const [user, setUser] = useState('')
  useEffect(() => {
    API.getUser().then(res => {
      setUserRole(res.data.role)
      setUser(res.data)
    })
  }, [])
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

export default UserDashboard
