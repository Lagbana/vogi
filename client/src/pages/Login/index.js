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

function Login () {
  return (
    <>
      <Navbar />
      <Layout>
        <Content style={styling.content}>
          <Row justify='center'>
            <Col xs={22} sm={22} md={14} lg={12} xl={12}>
              <Card shape='round' title='Login' headStyle={styling.header}>
                <Form buttonName='Login' />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  )
}

export default Login
