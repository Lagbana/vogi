import React from 'react'

const ProjectContext = React.createContext([
  {
    _id: '',
    name: '',
    description: '',
    skills: '',
    team: ''
  }
])

export default ProjectContext
