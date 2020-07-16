import React, { useContext } from 'react'
import { Card, Button, Descriptions, List } from 'antd'
import ProjectContext from '../../../utils/ProjectContext'

function NewProject ({ joinProjectHandler }) {
  const projects = useContext(ProjectContext)
  return (
    <List>
      {projects.map(project => (
        <List.Item key={project._id}>
          <Descriptions title={project.name}>
            <Descriptions.Item label='Description'>
              {project.description}
            </Descriptions.Item>
            <Descriptions.Item label='Required Skills'>
              {project.skills}
            </Descriptions.Item>
            <Descriptions.Item label='Team'>{project.team}</Descriptions.Item>
          </Descriptions>
          <Button
            id={project._id}
            onClick={() => joinProjectHandler(project._id)}
            type='primary'
          >
            Join
          </Button>
        </List.Item>
      ))}
    </List>
  )
}

export default NewProject
