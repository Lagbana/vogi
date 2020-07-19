import React, { useContext } from 'react'
import { Card, Button, notification } from 'antd'
import AvailableProjectContext from '../../../utils/AvailableProjectContext'
import useWindowSize from '../../../utils/useWindowSize'

function NewProject ({ joinProjectHandler }) {
  const [width, height] = useWindowSize()
  const projects = useContext(AvailableProjectContext)
  const styling = {
    cardSize: width > 767 ? 'default' : 'small'
  }

  const openNotificationWithIcon = (type, name) => {
    notification[type]({
      message: 'Welcome!',
      description: `You are now a part of ${name}.`
    })
  }

  return (
    <>
      {projects.map(project => (
        <Card
          style={{ marginBottom: 10 }}
          bodyStyle={{ paddingTop: 0 }}
          headStyle={{ borderBottom: 'none' }}
          title={project.name}
          size={styling.cardSize}
        >
          <p>Skills: {project.skills}</p>
          <p style={{ textAlign: 'left' }}>{project.description}</p>
          <Button
            id={project._id}
            onClick={() => {
              openNotificationWithIcon('success', project.name)
              return joinProjectHandler(project._id)
            }}
          >
            Join
          </Button>
        </Card>
      ))}
    </>
  )
}

export default NewProject
