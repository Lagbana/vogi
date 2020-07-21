import React, { useState, useEffect } from 'react'
import { Card, Button, Progress, List } from 'antd'
import useWindowSize from '../../../utils/useWindowSize'
import { CarryOutOutlined } from '@ant-design/icons'
import API from '../../../utils/API'

function ProjectCard ({ currentProject }) {
  const [width] = useWindowSize()
  const styling = {
    header: {
      border: 'none',
      color: '#1890ff',
      fontSize: width > 767 ? '22px' : '18px',
      marginBottom: 0
    },
    content: {
      padding: 0,
      margin: 0,
      minHeight: '100vh'
    },
    card: {
      width: '100%'
    },
    cardBody: {
      paddingTop: 0
    },
    content: {
      minHeight: width > 767 ? '70vh' : '80vh'
    },
    size: width > 767 ? 'default' : 'small',
    list: {
      minHeight: 175
    }
  }

  const [percent, setPercent] = useState(0)
  const [issuesData, setIssuesData] = useState([])

  useEffect(() => {
    const repoName = currentProject.name.trim()
    API.getAllIssues(repoName).then(res => {
      const issues = res.data[0]
      const progress = res.data[1]
      setIssuesData(issues)
      console.log(progress)
      const value = Math.round(
        (progress.closedIssues / progress.totalIssues) * 100
      )
      value === NaN ? setPercent(0) : setPercent(value)
    })
  }, [currentProject])

  return (
    <div style={styling.content}>
      <div>
        <span style={{ fontWeight: 'bold' }}>Skills: </span>
        <span style={{ fontStyle: 'italic' }}>{currentProject.skills}</span>
      </div>
      <div style={{ textAlign: 'left', marginTop: '0.5rem' }}>
        <span style={{ fontWeight: 'bold' }}>Description: </span>
        <span style={{ fontStyle: 'italic' }}>
          {currentProject.description}
        </span>
      </div>
      <div
        style={{
          wordWrap: 'break-word',
          marginTop: '1rem',
          backgroundColor: '#F8F8F8',
          width: '100%'
        }}
      >
        {/* <Timeline>
                  {issuesData.map(item => <Timeline.Item>{item.title}</Timeline.Item>)}
                </Timeline> */}
        <h3 style={{ paddingTop: '0.5rem' }}>Issues</h3>
        <List
          itemLayout='horizontal'
          style={styling.list}
          split={false}
          dataSource={issuesData}
          renderItem={item => {
            const iconColor = item.state === 'open' ? '#87d068' : '#c4c4c4'
            return (
              <List.Item
                style={{
                  textAlign: 'left',
                  marginLeft: '2rem'
                }}
              >
                <CarryOutOutlined
                  style={{
                    color: iconColor,
                    fontSize: '2.5vh',
                    marginRight: 5
                  }}
                />
                {item.title}
              </List.Item>
            )
          }}
        />
      </div>
      <br />
      <Progress width={80} type='circle' percent={percent} />
      <br />
      <br />
      <Button
        type='primary'
        shape='round'
        onClick={() =>
          window.open(
            `https://github.com/vogiPartner/${currentProject.name}`,
            '_blank'
          )
        }
      >
        View Repository
      </Button>
    </div>
  )
}

export default ProjectCard
