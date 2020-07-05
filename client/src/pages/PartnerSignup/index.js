import React from 'react'
import Form from '../../components/Form'
import { Layout, Card, Row, Col } from 'antd'
import Navbar from '../../components/Navbar'

const { Content } = Layout

const styling = {
  header: {
    border: 'none',
    fontSize: '22px',
    fontWeight: 'bold'
  },
  content: {
    padding: 24,
    margin: 0,
    minHeight: 280
  }
}

function PartnerSignup () {
  return (
    <>
      <Navbar />
      <Layout>
        <Content style={styling.content}>
          <Row justify='center'>
            <Col xs={22} sm={22} md={14} lg={12} xl={12}>
              <Card
                size='large'
                title='Partner Sign Up'
                headStyle={styling.header}
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

export default PartnerSignup
