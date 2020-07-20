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
  const [width, height] = useWindowSize()
  const styling = {
    layout: {
      minHeight: '100vh'
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
    footer: {
      textAlign: 'center'
    },
    cardSize: width > 767 ? 'default' : 'small'
  }

  const [form] = Form.useForm()
  const [title, setTitle] = useState('Organization Information')
  const user = useContext(UserContext)
  const [projects, setProjects] = useState([
    // {
    //   _id: '',
    //   name: '',
    //   description: '',
    //   skills: ''
    // }
  ])

  const openNotification = type => {
    notification[type]({
      message: 'New Project',
      description: 'You have successfully created a new project.'
    })
  }

  const onFinish = values => {
    // console.log(values)
    const { name } = values
    const strippedName = name.replace(
      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/\s]/gi,
      ''
    )
    API.createProject({ ...values, name: strippedName }).then(res => {
      openNotification('success')
      form.resetFields()
      setProjects([...projects, res.data])
      return res
    })
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

  const currentProjectData = () => {
    const [result] = projects.filter(project => project.name === title)
    return result
  }

  const renderContent = () => {
    switch (title) {
      case 'Organization Information':
        return <OrganizationInfo />
      case 'Create New Project':
        return <NewProject onFinish={onFinish} form={form} />
      case 'Settings':
        return <div />
      default:
        return <CurrentProject currentProjectData={currentProjectData} />
    }
  }

  return (
    <>
      <CreatedProjectContext.Provider value={projects}>
        <Navbar authenticated='true' />
        <Layout style={styling.layout}>
          <PartnerSidebar
            contentHandler={contentHandler}
            // currentProjectHandler={currentProjectHandler}
          />
          <Layout>
            <Content style={styling.content}>
              <Card title={title} headStyle={styling.header}>
                {renderContent()}
              </Card>
            </Content>
            <Footer style={styling.footer}>Vogi ©2020</Footer>
          </Layout>
        </Layout>
      </CreatedProjectContext.Provider>
    </>
  )
}

export default PartnerDashboard
