import React from 'react'
import Form from '../../components/Form'
import { Layout, Card, Row, Col } from 'antd'
import Navbar from '../../components/Navbar'

const { Content } = Layout

const styling = {
  header: {
    border: 'none',
    color: '#1890ff',
    fontSize: '22px'
  },
  content: {
    padding: 24,
    margin: 0,
    minHeight: 280
  }
}

function VolunteerSignup() {
  
  return (
    <>
      <Navbar />
      <Layout>
        <Content style={styling.content}>
          <Row justify='center'>
            <Col xs={22} sm={20} md={14} lg={12} xl={10}>
              <Card
                size='large'
                title='Volunteer Sign Up'
                headStyle={styling.header}
              >
                <Form page='volunteerSignup' buttonName='Sign Up' />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  )
}

export default VolunteerSignup
