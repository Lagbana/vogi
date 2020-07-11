import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Layout, Card } from 'antd'
import VolunteerSidebar from '../../components/VolunteerSidebar'
import Profile from '../../dashboard-content/volunteer/Profile'

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

  const contentHandler = title => {
    setTitle(title)
  }

  const renderContent = () => {
    switch (title) {
      case 'Profile':
        return <Profile />
    }
  }
  return (
    <>
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
    </>
  )
}

export default VolunteerDashboard
