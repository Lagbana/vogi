import React, { useEffect, useState } from 'react'
import VolunteerDashboard from '../VolunteerDashboard'
import PartnerDashboard from '../PartnerDashboard'
import API from '../../utils/API'

function UserDashboard () {
  const [user, setUser] = useState()
  useEffect(() => {
    API.getUser().then(res => {
      console.log(res.data)
      setUser(res.data.role)
    })
  }, [])
  const renderDashboard = () => {
    switch (user) {
      case 'Volunteer':
        return <VolunteerDashboard />
      case 'Partner':
        return <PartnerDashboard />
      default:
        return <div />
    }
  }
  return <>{renderDashboard()}</>
}

export default UserDashboard
