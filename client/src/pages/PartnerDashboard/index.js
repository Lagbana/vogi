// Import from the react library
import React, { useState, useEffect } from 'react'
// Import from AntDesign
import { Layout, Card, Form } from 'antd'
// Import Componentes
import Navbar from '../../components/Navbar'
import PartnerSidebar from '../../components/PartnerSidebar'
import NewProject from '../../dashboard-content/partner/NewProject'
import OrganizationInfo from '../../dashboard-content/partner/OrganizationInfo'
// Import React Context API
import ProjectContext from '../../utils/ProjectContext'
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
  const [projects, setProjects] = useState([
    {
      _id: '',
      name: '',
      description: '',
      skills: '',
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
    API.getProjects().then(res => {
      const projectNames = res.data.map(
        ({ _id, name, description, skills }) => {
          return {
            _id,
            name,
            description,
            skills
          }
        }
      )
      setProjects(projectNames)
      return res.data
    })
  }, [])

  const renderContent = () => {
    switch (title) {
      case 'Organization Information':
        return <OrganizationInfo />
      case 'Create New Project':
        return <NewProject onFinish={onFinish} form={form} />
      default:
        return <div />
    }
  }

  return (
    <>
      <ProjectContext.Provider value={projects}>
        <Navbar authenticated='true' />
        <Layout style={styling.layout}>
          <PartnerSidebar contentHandler={contentHandler} />
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

export default PartnerDashboard
