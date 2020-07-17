import React from 'react'
import PartnerForm from '../../components/LogInForms/partnerForm'
import VolunteerForm from '../../components/LogInForms/volunteerForm'
import { Layout, Card, Row, Col, Divider } from 'antd'
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
    marginLeft: '0rem',
    // border: '1px darkGray solid',
    marginTop: '10%'
  },
  partnerCard: {
    width: '100%',
    marginLeft: '0rem',
    // border: '1px darkGray solid',
    marginTop: '10%'
  }
}

function Login () {
  return (
    <>
      <Navbar />
      <Layout>
        <Content style={styling.content}>
          <Row justify='center'>
            <Col xl={10} lg={10} md={20} sm={20} xs={20} >
              <Card
                shape='round'
                title='Volunteer Log In'
                headStyle={styling.header}
                style={styling.volunteerCard}
              >
                <VolunteerForm />
              </Card>
            </Col>
            <Col className='gutter-row' xl={3} lg={3} md={0} sm={0} xs={0}>
              <Divider
                type='vertical'
                style={{ borderColor: '#c4c4c4', minHeight: '60vh' }}
              ></Divider>
            </Col>

            <Col xl={10} lg={10} md={20} sm={20} xs={20}>
              <Card
                title='Partner Log In'
                headStyle={styling.header}
                style={styling.partnerCard}
              >
                <PartnerForm />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  )
}

export default Login
