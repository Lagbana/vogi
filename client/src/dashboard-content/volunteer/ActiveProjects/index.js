import React from 'react'
import { Card } from 'antd'

function ProjectCard ({ currentProject }) {
  return (
    <Card type='inner'>
      Description: {currentProject.description} Skills: {currentProject.skills}
    </Card>
  )
}

export default ProjectCard
