// Import from the react library
import React, { useState, useEffect } from 'react'
// Import from AntDesign
import { Layout, Card } from 'antd'
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
  const [title, setTitle] = useState('Organization Information')
  const [projects, setProjects] = useState([
    {
      _id: '',
      name: '',
      description: '',
      skills: '',
      team: ''
    }
  ])

  const contentHandler = title => {
    setTitle(title)
  }

  useEffect(() => {
    API.getProjects().then(res => {
      const projectNames = res.data.map(
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
      return res.data
    })
  }, [])

  const renderContent = () => {
    switch (title) {
      case 'Organization Information':
        return <OrganizationInfo />
      case 'Create New Project':
        return <NewProject />
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
