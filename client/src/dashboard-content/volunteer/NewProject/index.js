import React, { useContext } from 'react'
import { Card, Button, notification } from 'antd'
import AvailableProjectContext from '../../../utils/AvailableProjectContext'
import useWindowSize from '../../../utils/useWindowSize'

function NewProject ({ joinProjectHandler }) {
  const [width] = useWindowSize()
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
          <div style={{ wordWrap: 'break-word' }}>
            <span style={{ fontWeight: 600 }}>Skills: </span>
            <span style={{ fontStyle: 'italic' }}>{project.skills}</span>
          </div>
          <div
            style={{
              textAlign: 'left',
              wordWrap: 'break-word',
              marginTop: '0.5rem'
            }}
          >
            <span style={{ fontWeight: 600 }}>Description: </span>
            {project.description}
          </div>
          <br />
          <Button
            id={project._id}
            shape='round'
            type='primary'
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
