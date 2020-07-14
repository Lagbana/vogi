import React from 'react'
import VolunteerDashboard from '../VolunteerDashboard'
import PartnerDashboard from '../PartnerDashboard'

function UserDashboard () {
  const renderDashboard = () => {
    const role = localStorage.getItem('role')
    switch (role) {
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
