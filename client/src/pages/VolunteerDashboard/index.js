// Import dependencies from react
import React, { useState, useEffect, useContext } from 'react'
// Import components from antdesign
import { Layout, Card } from 'antd'
// Import Components
import Navbar from '../../components/Navbar'
import VolunteerSidebar from '../../components/VolunteerSidebar'
import Profile from '../../dashboard-content/volunteer/Profile'
import NewProject from '../../dashboard-content/volunteer/NewProject'
import CurrentProject from '../../dashboard-content/volunteer/ActiveProjects'
// Import API methods
import API from '../../utils/API'
// Import React Context API
import UserContext from '../../utils/UserContext'
import AvailableProjectContext from '../../utils/AvailableProjectContext'
import JoinedProjectContext from '../../utils/JoinedProjectContext'
import useWindowSize from '../../utils/useWindowSize'
// Destructure Components from Layout in the antdesign library
const { Content, Footer } = Layout

function VolunteerDashboard () {
  // Responsive styling
  const [width] = useWindowSize()
  const styling = {
    layout: {
      height: width > 767 ? '90vh' : '93vh'
    },
    header: {
      backgroundColor: 'white',
      borderRadius: '15px',
      borderBottom: 'none'
    },
    content: {
      margin: width > 767 ? '10px' : '5px'
    },
    contentDiv: {
      padding: 24,
      minHeight: 360,
      backgroundColor: 'white'
    },
    cardSize: width > 767 ? 'default' : 'small'
  }
  // UseState hooks
  const [title, setTitle] = useState('Profile')
  const [availableProjects, setAvailableProjects] = useState([])
  const [currentProjects, setCurrentProjects] = useState([])
  const [currentProject, setCurrentProject] = useState('')
  // UserContext
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
  }, [currentProjects])

  useEffect(() => {
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
  // Update the title when the user clicks on a new tab
  const contentHandler = title => {
    setTitle(title)
  }

  // Display the content of the project the user wishes to view
  const currentProjectHandler = id => {
    currentProjects.forEach(project => {
      if (project._id === id) {
        setCurrentProject(project)
        setTitle(project.name)
      }
    })
  }

  // Join a new project and save the info to the database
  const joinProjectHandler = id => {
    API.joinProject({ userID: user._id, projectID: id })
      .then(res => {
        setCurrentProjects([...currentProjects, res.data])
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Render the appropriate content
  const renderContent = () => {
    switch (title) {
      case 'Profile':
        return <Profile />
      case 'Join a New Project':
        return <NewProject joinProjectHandler={joinProjectHandler} />
      case currentProject.name:
        return <CurrentProject currentProject={currentProject} />
      default:
        return <div />
    }
  }
  return (
    <>
      <AvailableProjectContext.Provider value={availableProjects}>
        <JoinedProjectContext.Provider value={currentProjects}>
          <Navbar authenticated='true' />
          <Layout>
            <VolunteerSidebar
              contentHandler={contentHandler}
              currentProjectHandler={currentProjectHandler}
            />
            <Layout style={styling.layout}>
              <Content style={styling.content}>
                <Card
                  title={title}
                  headStyle={styling.header}
                  size={styling.cardSize}
                  style={{ borderRadius: '15px' }}
                >
                  {renderContent()}
                </Card>
              </Content>
            </Layout>
          </Layout>
        </JoinedProjectContext.Provider>
      </AvailableProjectContext.Provider>
    </>
  )
}

// Export the Component
export default VolunteerDashboard
