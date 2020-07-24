// Import React dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Layout, Row, Col, Divider } from 'antd'
import Navbar from '../../components/Navbar'
import useWindowSize from '../../utils/useWindowSize'
import PeopleImg from '../../resources/people.jpg'
import PeopleImg2 from '../../resources/people1.jpg'
const { Content } = Layout

// Landing page
function Landing () {
  // Width width watching custom hook
  const [width, height] = useWindowSize()
  const styling = {
    content: {
      paddingTop: width > 990 ? 24 : 16,
      margin: 0,
      backgroundColor: '#ffffff'
    },
    content2: {
      paddingTop: width > 990 ? 24 : 16,
      margin: 0,
      backgroundColor: '#ffffff'
    },
    container: {
      wordWrap: 'break-word',
      maxWidth: width > 991 ? '80vw' : '90vw',
      marginLeft: width > 991 ? 'auto' : 'auto',
      marginRight: width > 991 ? 'auto' : '0',
      marginTop: width > 990 ? '3rem' : '1.5rem',
      color: '#353452'
    },
    valueProp: {
      fontFamily: 'Poppins',
      fontSize: width > 990 ? '2.5em' : '2em',
      marginRight: 'auto',
      marginBottom: '0.5rem',
      fontWeight: 600
    },
    detail: {
      fontSize: '1.15rem',
      textAlign: 'left',
      marginRight: '5rem'
    },
    span: {
      color: '#19A2C0'
    },
    subHeaders: {
      fontSize: width > 990 ? '1.35rem' : '1.2em',
      marginTop: width > 991 ? '0' : '1em'
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
      color: '#ffffff'
    },
    groups: {
      marginTop: width > 991 ? '8vh' : '5vh',
      marginLeft: width > 991 ? 'auto' : 'auto',
      marginRight: width > 991 ? 'auto' : 'auto'
    },
    people: {
      width: width > 991 ? '25vw' : '50vw',
      marginTop: width > 991 ? 0 : '2vh'
    },
    people2: {
      marginTop: width > 991 ? '1vh' : '2vh',
      marginBottom: width > 991 ? '1vh' : 0,
      width: width > 991 ? '24vw' : '45vw'
    },
    container2: {
      backgroundColor: '#ecf9fc',
      wordWrap: 'break-word',
      maxWidth: '100vw',
      marginLeft: width > 991 ? 'auto' : '0',
      marginRight: width > 991 ? 'auto' : '0',
      marginTop: '0rem'
    },
    valueCreation: {
      fontFamily: 'Poppins',
      fontSize: width > 991 ? '2.5rem' : '1.15rem',
      color: '#19A2C0',
      marginTop: width > 991 ? '2rem' : '2vh',
      marginLeft: width > 991 ? '0.5rem' : '0.01rem',
      fontWeight: 600
    },
    vogi: {
      fontSize: width > 991 ? '1.25rem' : '1.25rem',
      paddingRight: '2vw',
      color: 'black',
      marginTop: width > 991 ? '2rem' : '0.5rem'
    },
    volunteer: {
      width: width > 991 ? '75vw' : '100vw',
      marginLeft: width > 991 ? 'auto' : '0',
      marginRight: width > 991 ? 'auto' : '0',
      color: '#353452'
    },
    partner: {
      width: width > 991 ? '75vw' : '100vw',
      marginLeft: width > 991 ? 'auto' : '0',
      marginRight: width > 991 ? 'auto' : '0',
      color: '#353452'
    },
    groupDescription: {
      paddingLeft: width > 991 ? '5vw' : '5vw',
      paddingRight: width > 991 ? '5vw' : '5vw',
      fontSize: width > 991 ? '1.15rem' : '1rem',
      wordWrap: 'break-word'
    },
    groupHeader: {
      fontFamily: 'Poppins',
      fontSize: width > 991 ? '1.5rem' : '1rem',
      color: '#19A2C0',
      marginTop: width > 991 ? '2rem' : '2vh',
      marginLeft: width > 991 ? '0.5rem' : '0.01rem',
      fontWeight: 400
    }
  }

  return (
    <div>
      <Navbar />
      <Content style={styling.content}>
        <Row style={styling.container}>
          <Col xl={14} lg={14} md={18} sm={20} xs={22}>
            <p style={styling.valueProp}>
              Social impact and economic growth happens through collaboration.
              <span style={styling.span}> We help make it happen.</span>
            </p>
          </Col>
          <Col xl={10} lg={10} md={18} sm={20} xs={22}>
            <img
              src={PeopleImg}
              style={styling.people}
              alt='a team of web developers building a website for a non-profit'
            />
          </Col>
        </Row>
        <Row justify='center' style={styling.groups}>
          <Col xl={10} lg={10} md={18} sm={20} xs={22}>
            <div>
              <h3 style={styling.subHeaders}> For Volunteers</h3>
              <p style={styling.subContent}>
                Create a profile and find interesting projects to contribute to.
              </p>
              <Link to='/signup'>
                <Button style={styling.getStarted}>Get Started</Button>
              </Link>
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
                Create a project, add issues, and track the progress.
              </p>
              <Link to='/signup'>
                <Button style={styling.getStarted}>Get Started</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Content>
      <Content style={styling.content2}>
        <Row justify='center' style={styling.container2}>
          <Col xl={10} lg={10} md={18} sm={22} xs={22}>
            <img
              src={PeopleImg2}
              style={styling.people2}
              alt='a team of analysts in a board room problem solving'
            />
          </Col>
          <Col xl={14} lg={14} md={18} sm={22} xs={22}>
            <div>
              <h3 style={styling.valueCreation}>Value Creation</h3>
            </div>
            <p style={styling.vogi}>
              Vogi is the not-for-profit solution provider to help meet software
              development and business analysis needs for non-profits and
              early-stage start-ups in Canada.
            </p>
          </Col>
        </Row>
        <Row>
          <Col style={styling.volunteer} id='/volunteer'>
            <div style={styling.groupDescription}>
              <h3 style={styling.groupHeader}>Volunteers</h3>
              <p>
                Our volunteers are business and software developer professionals
                and students seeking to do some good or create value by
                contributing to non-profit and early stage start-up
                organizations in Canada. References for each project completed
                by volunteers are provided on request and any reward (if any)
                provided by organizations go directly to the contributors.
              </p>
            </div>
          </Col>
          <Col
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={8}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            <Divider
              type='horizontal'
              style={{ borderColor: '#C4C4C4', maxWidth: '25vw' }}
            ></Divider>
          </Col>
          <Col style={styling.partner} id='/partner'>
            <div style={styling.groupDescription}>
              <h3 style={styling.groupHeader}>Partners</h3>
              <p>
                Our partners are non-profits and early stage start-ups with no
                financial backing. Before a project is accepted, we assess the
                partner’s financial capacity to employ workers (or lack of), our
                available volunteers, the project scope, and the timeframe for
                the project completion.
              </p>
            </div>
          </Col>
        </Row>
      </Content>
    </div>
  )
}

export default Landing
