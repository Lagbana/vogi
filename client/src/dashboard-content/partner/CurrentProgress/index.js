import React from 'react'
// import CreatedProjectContext from '../../../utils/CreatedProjectContext'
import { Layout, Card, Row, Col, Divider } from 'antd'

const { Content } = Layout

const styling = {
  wrapper: {},
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

function CurrentProject ({ currentProjectData }) {
  const dataObject = currentProjectData()

  return (
    <>
      <Content style={styling.content}>
        <Row justify='center'>
          <Col xl={10} lg={10} md={20} sm={20} xs={20}>
            <Card
              title='Project Feature Issues'
              headStyle={styling.header}
              style={styling.volunteerCard}
            >
              <div>
                <p>Project name: {dataObject.name}</p>
                <p>Project Description: {dataObject.description}</p>
                <p>Project Skills: {dataObject.skills}</p>
              </div>
            </Card>
          </Col>
          <Col className='gutter-row' xl={3} lg={3} md={0} sm={0} xs={0}>
          </Col>
          <Col xl={10} lg={10} md={20} sm={20} xs={20}>
            <Card
              title='Project Status'
              headStyle={styling.header}
              style={styling.partnerCard}
            >
              <div>
                <p>Project name: {dataObject.name}</p>
                <p>Project Description: {dataObject.description}</p>
                <p>Project Skills: {dataObject.skills}</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  )
}

export default CurrentProject
