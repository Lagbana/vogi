import React from 'react'
import Form from '../../components/Form'
import { Layout, Card, Row, Col } from 'antd'
const { Header, Content } = Layout

function Login () {
  return (
    <Layout>
      <Header>This is the Header</Header>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        <Row justify='center'>
          <Col xs={22} sm={22} md={14} lg={12} xl={12}>
            <Card>
              <Form />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default Login
