import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Layout, Card } from 'antd'
import VolunteerSidebar from '../../components/VolunteerSidebar'
import Profile from '../../dashboard-content/volunteer/Profile'
import NewProject from '../../dashboard-content/volunteer/NewProject'
import API from '../../utils/API'
// Import React Context API
import ProjectContext from '../../utils/ProjectContext'

const { Content, Footer } = Layout
const styling = {
  layout: {
    minHeight: '100vh'
  },
  header: {
    backgroundColor: '#E6F7FF'
  },
  content: {
    margin: '16px'
  },
  contentDiv: {
    padding: 24,
    minHeight: 360,
    backgroundColor: 'white'
  },
  footer: {
    textAlign: 'center'
  }
}

function VolunteerDashboard () {
  const [title, setTitle] = useState('Profile')
  const [projects, setProjects] = useState([
    {
      _id: '',
      name: '',
      description: '',
      skills: '',
      team: ''
    }
  ])

  useEffect(() => {
    API.getProjects().then(res => {
      const fetchedProjects = res.data.map(
        ({ _id, name, description, skills, team }) => {
          return {
            _id,
            name,
            description,
            skills,
            team
          }
        }
      )
      setProjects(fetchedProjects)
      return res.data
    })
  }, [])

  const contentHandler = title => {
    setTitle(title)
  }

  const renderContent = () => {
    switch (title) {
      case 'Profile':
        return <Profile />
      case 'New Project':
        return <NewProject />
      default:
        return <div />
    }
  }
  return (
    <>
      <ProjectContext.Provider value={projects}>
        <Navbar authenticated='true' />
        <Layout style={styling.layout}>
          <VolunteerSidebar contentHandler={contentHandler} />
          <Layout>
            <Content style={styling.content}>
              <Card title={title} headStyle={styling.header}>
                {renderContent()}
              </Card>
            </Content>
            <Footer style={styling.footer}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </ProjectContext.Provider>
    </>
  )
}

export default VolunteerDashboard
