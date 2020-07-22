// Import React dependencies
import React from 'react'
import { Button, Layout, Row, Col, Divider } from 'antd'
import Navbar from '../../components/Navbar'
import useWindowSize from '../../utils/useWindowSize'
const { Content } = Layout


// Landing page
function Landing () {
  const [width, height] = useWindowSize()
  const styling = {
    content: {
      paddingTop: width > 990 ? 24 : 16,
      margin: 0,
      minHeight: '89vh',
      backgroundColor: '#F8F8F8'
    },
    container: {
      wordWrap: 'break-word',
      maxWidth: '70vw',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '2rem',
      color: '#353452',
    },
    valueProp: {
      fontFamily: 'Poppins',
      fontSize: '2.5rem',
      textAlign: 'left',
      marginBottom: '0.5rem',
      fontWeight: 600
    },
    detail: {
      fontSize: '1.5rem',
      textAlign: 'left'
    },
    span: {
      color: '#19A2C0'
    }
  }
  
  return (
    <div >
      <Navbar />
      <Content style={styling.content}>
        <div style={styling.container}>
          <p style={styling.valueProp}>
            Social impact and economic growth happens through collaboraton.
            <span style={styling.span}> We help make it happen.</span>
          </p>
          <p style={styling.detail}>
            Vogi is a not-for-profit solution provider to help meet software
            development and business analysis needs for non-profits and
            early-stage startups in Canada.
          </p>
        </div>
        <Row justify='center'>
          <Col xl={10} lg={10} md={18} sm={20} xs={22}>
            <div>
              <h3> For Volunteers</h3>
              <p>
                Create a profile and find interesting projects to contribute to.
              </p>
              <Button>Get Started</Button>
            </div>
          </Col>
          <Col className='gutter-row' xl={3} lg={3} md={0} sm={0} xs={0}>
            <Divider
              type='vertical'
              style={{ borderColor: '#C4C4C4', minHeight: '20vh' }}
            ></Divider>
          </Col>
          <Col xl={10} lg={10} md={18} sm={20} xs={22}>
            <div>
              <h3> For Partners</h3>
              <p>
                For non-profits and startup partners, create a project, add
                issues, and track progress.
              </p>
              <Button>Get Started</Button>
            </div>
          </Col>
        </Row>
      </Content>
    </div>
  )
}

export default Landing
