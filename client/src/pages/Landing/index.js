// Import React dependencies
import React from 'react'
import { Button, Layout, Row, Col, Divider } from 'antd'
import Navbar from '../../components/Navbar'
import useWindowSize from '../../utils/useWindowSize'
import PeopleImg from '../../resources/people.jpg'
import PeopleImg2 from '../../resources/people1.jpg'
const { Content } = Layout

// Landing page
function Landing () {
  const [width, height] = useWindowSize()
  const styling = {
    content: {
      paddingTop: width > 990 ? 24 : 16,
      margin: 0,
      minHeight: '89vh',
      backgroundColor: '#ffffff'
    },
    container: {
      wordWrap: 'break-word',
      maxWidth: width > 990 ? '80vw' : '100vw',
      marginLeft: width > 989 ? 'auto' : '18vw',
      marginRight: width > 989 ? 'auto' : '0',
      // marginLeft: 'auto',
      // marginRight: 'auto',
      marginTop: width > 990 ? '3rem' : '1.5rem',
      color: '#353452'
    },
    // container: {
    //   wordWrap: 'break-word',
    //   maxWidth: '70vw',
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    //   marginTop: '2rem',
    //   color: '#353452',
    // },
    valueProp: {
      fontFamily: 'Poppins',
      fontSize: width > 990 ? '2.5em' : '2em',
      // fontSize: '2.5rem',
      textAlign: 'left',
      marginBottom: '0.5rem',
      fontWeight: 600
    },
    detail: {
      fontSize: '1.15rem',
      // fontSize: '1.25rem',
      textAlign: 'left',
      marginRight: '5rem'
    },
    span: {
      color: '#19A2C0'
    },
    subHeaders: {
      fontSize: '1.35rem'
    },
    subContent: {
      fontSize: '1.05rem',
      textAlign: 'center',
      color: 'black',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    getStarted: {
      borderRadius: '1rem',
      backgroundColor: '#FD4F64',
      // backgroundColor: '#19A2C0',
      color: '#ffffff'
    },
    groups: {
      marginTop: width > 991 ? '12.5vh' : '5vh',
      marginLeft: width > 991 ? '-3vw' : 'auto',
      marginRight: width > 991 ? '-3vw' : 'auto',
    },
    people: {
      width: width > 991 ? '25vw' : '50vw',
      marginTop: width > 991 ? 0 : '2vh'
    },
    people2: {
      height: '40vh',
      marginTop: '2.5vh',
      marginBottom: '2.5vh'
    },
    about: {
      height: '45vh',
      width: '100vw',
      backgroundColor: '#ecf9fc'
    },
    valueCreation: {
      fontFamily: 'Poppins',
      fontSize: '2.5rem',
      // textAlign: 'left',
      color: '#19A2C0',
      marginTop: '2rem',
      marginBottom: '0.5rem',
      marginLeft: '0.5rem',
      fontWeight: 600
    },
    vogi: {
      fontSize: '1.5rem',
      color: 'black',
      marginTop: '2rem'
    },
    participants: {
      height: '55vh'
    },
    volunteer: {
      height: '27.5vh',
      backgroundColor: 'pink',
      width: '100vw'
    },
    partner: {
      height: '27.5vh',
      backgroundColor: 'green',
      width: '100vw'
    }
  }

  return (
    <div>
      <Navbar />
      <Content style={styling.content}>
        <Row style={styling.container}>
          <Col xl={14} lg={12} md={18} sm={20} xs={22}>
            <p style={styling.valueProp}>
              Social impact and economic growth happens through collaboraton.
              <span style={styling.span}> We help make it happen.</span>
            </p>
          </Col>
          <Col xl={10} lg={12} md={18} sm={20} xs={22}>
            <img
              src={PeopleImg}
              style={styling.people}
              alt='a team of programmers building products for a non-profit'
            />
          </Col>
        </Row>
        {/* <div style={styling.container}>
          <p style={styling.valueProp}>
            Social impact and economic growth happens through collaboraton.
            <span style={styling.span}> We help make it happen.</span>
          </p>
          <p style={styling.detail}>
            Vogi is the not-for-profit solution provider to help meet software
            development and business analysis needs for non-profits and
            early-stage startups in Canada.
          </p>
        </div> */}
        <Row
          justify='center'
          style={styling.groups}
        >
          {/* <Row justify='center' style={{marginTop: '5rem', marginLeft: 'auto', marginRight: 'auto'}}> */}
          <Col xl={10} lg={10} md={18} sm={20} xs={22}>
            <div>
              <h3 style={styling.subHeaders}> For Volunteers</h3>
              <p style={styling.subContent}>
                Create a profile and find interesting projects to contribute to.
              </p>
              <Button style={styling.getStarted}>Get Started</Button>
            </div>
          </Col>
          <Col xl={1} lg={0} md={0} sm={0} xs={0}>
            <Divider
              type='vertical'
              style={{
                borderColor: '#C4C4C4',
                minHeight: '15vh',
                padding: 0,
                margin: 0
              }}
            ></Divider>
          </Col>
          <Col xl={10} lg={10} md={18} sm={20} xs={22}>
            <div>
              <h3 style={styling.subHeaders}> For Partners </h3>
              <p style={styling.subContent}>
                For non-profits and startup partners, create a project, add
                issues, and track progress.
              </p>
              <Button style={styling.getStarted}>Get Started</Button>
            </div>
          </Col>
        </Row>
      </Content>
      <Content>
        <Row>
          <Col style={styling.about}>
            <Row>
              <Col xl={10} lg={12} md={18} sm={20} xs={22}>
                <img
                  src={PeopleImg2}
                  style={styling.people2}
                  alt='three women and one man in a board room problem solving'
                />
              </Col>
              <Col xl={12} lg={12} md={18} sm={20} xs={22}>
                <div>
                  <h3 style={styling.valueCreation}>Value Creation</h3>
                </div>
                <p style={styling.vogi}>
                  Vogi is the not-for-profit solution provider to help meet
                  software development and business analysis needs for
                  non-profits and early-stage startups in Canada.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={styling.participants}>
          <Col style={styling.volunteer} id='/volunteer'>
            Volunteer
          </Col>
          <Col style={styling.partner} id='/partner'>
            Partner
          </Col>
        </Row>
      </Content>
    </div>
  )
}

export default Landing
