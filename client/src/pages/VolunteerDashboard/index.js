import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../components/Navbar'
import { Layout, Card } from 'antd'
import VolunteerSidebar from '../../components/VolunteerSidebar'
import Profile from '../../dashboard-content/volunteer/Profile'
import NewProject from '../../dashboard-content/volunteer/NewProject'
import API from '../../utils/API'
import UserContext from '../../utils/UserContext'
// Import React Context API
import AvailableProjectContext from '../../utils/AvailableProjectContext'
import JoinedProjectContext from '../../utils/JoinedProjectContext'

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
  const [availableProjects, setAvailableProjects] = useState([])
  const [currentProjects, setCurrentProjects] = useState([])
  const user = useContext(UserContext)

  // Get Available Projects to Join
  useEffect(() => {
    API.getAvailableProjects().then(res => {
      const fetchedProjects = res.data.map(
        ({ _id, name, description, skills }) => {
          return {
            _id,
            name,
            description,
            skills
          }
        }
      )
      setAvailableProjects(fetchedProjects)
      return res.data
    })
    // Get Current Projects
    API.getUser().then(res => {
      const joinedProjects = res.data.projects.map(
        ({ _id, name, description, skills }) => {
          return {
            _id,
            name,
            description,
            skills
          }
        }
      )
      setCurrentProjects(joinedProjects)
    })
  }, [])

  const contentHandler = title => {
    setTitle(title)
  }

  const joinProjectHandler = id => {
    API.joinProject({ userID: user._id, projectID: id }).then(res => {
      setCurrentProjects([...currentProjects, res.data])
    })
    API.getAvailableProjects().then(res => {
      const fetchedProjects = res.data.map(
        ({ _id, name, description, skills }) => {
          return {
            _id,
            name,
            description,
            skills
          }
        }
      )
      setAvailableProjects(fetchedProjects)
      return res.data
    })
  }

  const renderContent = () => {
    switch (title) {
      case 'Profile':
        return <Profile />
      case 'New Project':
        return <NewProject joinProjectHandler={joinProjectHandler} />
      default:
        return <div />
    }
  }
  return (
    <>
      <AvailableProjectContext.Provider value={availableProjects}>
        <JoinedProjectContext.Provider value={currentProjects}>
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
        </JoinedProjectContext.Provider>
      </AvailableProjectContext.Provider>
    </>
  )
}

export default VolunteerDashboard
