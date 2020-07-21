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
      minHeight: '90vh',
      backgroundColor: '#F8F8F8'
    }
  }
  
  return (
    <div>
      <Navbar />
      <Content style={styling.content}>
        <div>
          <p>
            Social impact and economic growth happens through collaboraton.
            <span> We help make it happen.</span>
          </p>
          <p>
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
              style={{ borderColor: '#C4C4C4', minHeight: '80vh' }}
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
