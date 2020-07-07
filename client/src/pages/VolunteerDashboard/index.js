import React from 'react'
import Navbar from '../../components/Navbar'
import { Layout } from 'antd'
import VolunteerSidebar from '../../components/VolunteerSidebar'

const { Header, Content, Footer } = Layout
const styling = {
  layout: {
    minHeight: '100vh'
  },
  header: {
    padding: 0,
    backgroundColor: '#E6F7FF',
    marginTop: '16px',
    marginLeft: '16px',
    marginRight: '16px'
  },
  content: {
    margin: '0 16px'
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
  return (
    <>
      <Navbar authenticated='true' />
      <Layout style={styling.layout}>
        <VolunteerSidebar />
        <Layout>
          <Header style={styling.header}>Title</Header>
          <Content style={styling.content}>
            <div style={styling.contentDiv}>The content goes here</div>
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
