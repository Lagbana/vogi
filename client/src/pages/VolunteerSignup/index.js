import React from 'react'
import Form from '../../components/Form'
import { Layout, Card, Row, Col } from 'antd'
import Navbar from '../../components/Navbar'

const { Content } = Layout

function VolunteerSignup () {
  return (
    <>
      <Navbar />
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Row justify='center'>
            <Col xs={22} sm={22} md={14} lg={12} xl={12}>
              <Card
                size='large'
                title='Volunteer Sign Up'
                headStyle={{ border: 'none' }}
              >
                <Form buttonName='Sign Up' />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  )
}

export default VolunteerSignup
