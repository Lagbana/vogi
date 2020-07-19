import React, { useContext } from 'react'
import { Card, Button } from 'antd'
import AvailableProjectContext from '../../../utils/AvailableProjectContext'

function NewProject ({ joinProjectHandler }) {
  const projects = useContext(AvailableProjectContext)
  return (
    <>
      {projects.map(project => (
        <Card
          style={{ marginBottom: 10 }}
          headStyle={{ borderBottom: 'none' }}
          title={project.name}
        >
          <p>Skills: {project.skills}</p>
          <p style={{ textAlign: 'left' }}>{project.description}</p>
          <Button
            id={project._id}
            onClick={() => joinProjectHandler(project._id)}
          >
            Join
          </Button>
        </Card>
      ))}
    </>
  )
}

export default NewProject
