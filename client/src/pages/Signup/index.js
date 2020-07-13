import React from 'react'
import PartnerForm from '../../components/SignUpForms/partnerForm'
import VolunteerForm from '../../components/SignUpForms/volunteerForm'
import { Layout, Card, Row, Col, Space } from 'antd'
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
    minHeight: '100vh'
  },
  volunteerCard: {
    width: '100%',
    marginLeft: '0rem'
    // marginLeft: '8rem',
  },
  partnerCard: {
    width: '100%',
    marginLeft: '0rem'
    // marginLeft: '12rem'
  }
}

function SignUp () {
  return (
    <>
      <Navbar />
      <Layout>
        <Content style={styling.content}>
          {/* <Row justify='center'> */}
          {/* <Col xs={22} sm={20} md={14} lg={12} xl={10}> */}
          {/* <Card shape='round' title='Login' headStyle={styling.header}>
              <Form buttonName='Login' />
            </Card> */}
          {/* </Col> */}
          {/* <Col xs={22} sm={20} md={14} lg={12} xl={10}> */}
          <Space
            direction='vertical'
            // direction='horizontal'
            align='center'
            size='large'
            style={{ width: '100%' }}
            // style={{ width: '85%' }}
          >
            <Row>
              <Col span={48}>
                <Card
                  shape='round'
                  title='Volunteer Sign Up'
                  headStyle={styling.header}
                  style={styling.volunteerCard}
                >
                  <VolunteerForm />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col span={48}>
                <Card
                  shape='round'
                  title='Partner Sign Up'
                  headStyle={styling.header}
                  style={styling.partnerCard}
                >
                  <PartnerForm />
                </Card>
              </Col>
            </Row>
          </Space>
          {/* </Col> */}
          {/* </Row> */}
        </Content>
      </Layout>
    </>
  )
}

export default SignUp
