// Import from the react library
import React, { useState, useEffect, useContext } from 'react'
// Import from AntDesign
import { Layout, Card, Form } from 'antd'
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

function PartnerDashboard () {
  const [form] = Form.useForm()
  const [title, setTitle] = useState('Organization Information')
  const user = useContext(UserContext)
  const [projects, setProjects] = useState([
    {
      _id: '',
      name: '',
      description: '',
      skills: ''
    }
  ])



  const onFinish = values => {
    API.createProject(values).then(res => {
      form.resetFields()
      setProjects([...projects, res.data])
      return res
    })
  }

  const contentHandler = title => {
    setTitle(title)
  }

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
          <PartnerSidebar contentHandler={contentHandler} />
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
