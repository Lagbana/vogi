// Import from the react library
import React, { useState, useEffect, useContext } from 'react'
// Import from AntDesign
import { Layout, Card, Form, notification } from 'antd'
// Import Componentes
import Navbar from '../../components/Navbar'
import PartnerSidebar from '../../components/PartnerSidebar'
import NewProject from '../../dashboard-content/partner/NewProject'
import OrganizationInfo from '../../dashboard-content/partner/OrganizationInfo'
import CurrentProject from '../../dashboard-content/partner/CurrentProgress'
// Import React Context API
import CreatedProjectContext from '../../utils/CreatedProjectContext'
import UserContext from '../../utils/UserContext'
// Import API methods
import API from '../../utils/API'
// Import window size for responsiveness
import useWindowSize from '../../utils/useWindowSize'
// Destructure antdesign's components
const { Content, Footer } = Layout

function PartnerDashboard () {
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
  // Ant design form methods
  const [form] = Form.useForm()
  // Use state hooks
  const [title, setTitle] = useState('Organization Information')
  const [projects, setProjects] = useState([])
  const [currentProject, setCurrentProject] = useState('')
  // User context API
  const user = useContext(UserContext)

  // Send a notification when the user has successfully created a new project
  const openNotification = type => {
    notification[type]({
      message: 'New Project',
      description: 'You have successfully created a new project.'
    })
  }
  // When the user has created a project,
  // post to the database, strip non alphanumeric characters and update the state of projects
  const onFinish = values => {
    const { name } = values
    const strippedName = name.replace(/\W/gi, '')
    API.createProject({ ...values, name: strippedName }).then(res => {
      openNotification('success')
      form.resetFields()
      setProjects([...projects, res.data])
      return res
    })
  }
  // Validate that the project does not already exist
  const projectValidator = (rule, value) => {
    for (let project of projects) {
      if (project.name === value)
        return Promise.reject('This project name already exists')
    }
    return Promise.resolve()
  }
  // Update the page title
  const contentHandler = title => {
    setTitle(title)
  }

  // Get the user (partner)
  useEffect(() => {
    API.getUser().then(res => {
      const projectNames = res.data.projects.map(
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
      setProjects(projectNames)
    })
  }, [])
  // Update the content of the project on the screen
  const currentProjectHandler = id => {
    projects.forEach(project => {
      if (project._id === id) {
        setCurrentProject(project)
        setTitle(project.name)
      }
    })
  }
  // Conditionally render content
  const renderContent = () => {
    switch (title) {
      case 'Organization Information':
        return <OrganizationInfo />
      case 'Create New Project':
        return (
          <NewProject
            projectValidator={projectValidator}
            onFinish={onFinish}
            form={form}
          />
        )
      // case 'Settings':
      //   return <div />
      case currentProject.name:
        return <CurrentProject currentProject={currentProject} />
      default:
        return <div />
    }
  }

  return (
    <>
      <CreatedProjectContext.Provider value={projects}>
        <Navbar authenticated='true' />
        <Layout style={styling.layout}>
          <PartnerSidebar
            contentHandler={contentHandler}
            currentProjectHandler={currentProjectHandler}
          />
          <Layout>
            <Content style={styling.content}>
              <Card
                size={styling.cardSize}
                title={title}
                headStyle={styling.header}
                style={{ borderRadius: '15px' }}
              >
                {renderContent()}
              </Card>
            </Content>
          </Layout>
        </Layout>
      </CreatedProjectContext.Provider>
    </>
  )
}
// Export the partner dashboard
export default PartnerDashboard
