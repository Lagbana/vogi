import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Layout, Card } from 'antd'
import PartnerSidebar from '../../components/PartnerSidebar'
import NewProject from '../../dashboard-content/partner/NewProject'
import OrganizationInfo from '../../dashboard-content/partner/OrganizationInfo'

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

  const contentHandler = title => {
    setTitle(title)
  }

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
    </>
  )
}

export default PartnerDashboard
