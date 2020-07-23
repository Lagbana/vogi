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
import API from '../../utils/API'
import useWindowSize from '../../utils/useWindowSize'

const { Content, Footer } = Layout

function PartnerDashboard () {
  const [width] = useWindowSize()
  const styling = {
    layout: {
      height: width > 767 ? '90vh' : '93vh'
    },
    header: {
      backgroundColor: '#E6F7FF'
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

  const [form] = Form.useForm()
  const [title, setTitle] = useState('Organization Information')
  const user = useContext(UserContext)
  const [projects, setProjects] = useState([])
  const [currentProject, setCurrentProject] = useState('')

  const openNotification = type => {
    notification[type]({
      message: 'New Project',
      description: 'You have successfully created a new project.'
    })
  }

  const onFinish = values => {
    const { name } = values
    const strippedName = name.replace(
      /[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/\s]/gi,
      ''
    )
    API.createProject({ ...values, name: strippedName }).then(res => {
      openNotification('success')
      form.resetFields()
      setProjects([...projects, res.data])
      return res
    })
  }

  const projectValidator = (rule, value) => {
    for (let project of projects) {
      if (project.name === value)
        return Promise.reject('This project name already exists')
    }
    return Promise.resolve()
  }

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

  const currentProjectHandler = id => {
    projects.forEach(project => {
      if (project._id === id) {
        setCurrentProject(project)
        setTitle(project.name)
      }
    })
  }

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
      case 'Settings':
        return <div />
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

export default PartnerDashboard
