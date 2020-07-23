import React from 'react'
import PartnerForm from '../../components/LogInForms/partnerForm'
import VolunteerForm from '../../components/LogInForms/volunteerForm'
import { Layout, Card, Row, Col, Divider } from 'antd'
import AltNavbar from '../../components/AltNavbar'
import useWindowSize from '../../utils/useWindowSize'

const { Content } = Layout

function Login () {
  const [width] = useWindowSize()
  const styling = {
    wrapper: {},
    header: {
      border: 'none',
      color: '#353452',
      fontSize: width > 990 ? 22 : 20
    },
    content: {
      paddingTop: width > 990 ? 24 : 16,
      margin: 0,
      minHeight: width > 767 ? '90vh' : '94vh',
      backgroundColor: '#F8F8F8'
    },
    volunteerCard: {
      width: '100%',
      marginLeft: '0rem',
      marginBottom: width > 990 ? '0%' : '4%',
      marginTop: width > 990 ? '18%' : '0%',
      border: '1px #C4C4C4 solid',
      borderRadius: '15px'
    },

    partnerCard: {
      width: '100%',
      marginLeft: '0rem',
      marginBottom: width > 990 ? '0%' : '4%',
      marginTop: width > 990 ? '18%' : '0%',
      border: '1px #C4C4C4 solid',
      borderRadius: '15px'
    }
  }
  return (
    <>
      <AltNavbar />
      <Layout>
        <Content style={styling.content}>
          <Row justify='center'>
            <Col xl={10} lg={10} md={18} sm={20} xs={21}>
              <Card
                size={width > 990 ? 'default' : 'small'}
                title='Volunteer Log In'
                headStyle={styling.header}
                style={styling.volunteerCard}
              >
                <VolunteerForm />
              </Card>
            </Col>
            <Col className='gutter-row' xl={2} lg={2} md={0} sm={0} xs={0}>
              <Divider
                type='vertical'
                style={{
                  borderColor: '#C4C4C4',
                  minHeight: '57vh',
                  marginTop: '70px'
                }}
              ></Divider>
            </Col>

            <Col xxl={10} lg={10} md={18} sm={20} xs={21}>
              <Card
                size={width > 990 ? 'default' : 'small'}
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
