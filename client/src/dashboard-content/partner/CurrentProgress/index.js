import React, { useState } from 'react'
// import CreatedProjectContext from '../../../utils/CreatedProjectContext'
import { Layout, Card, Row, Col, Form as AntForm, Input, Button } from 'antd'
import API from '../../../utils/API'

const { Content } = Layout
// const { TextArea } = Input

const styling = {
  wrapper: {},
  header: {
    border: 'none',
    color: '#1890ff',
    fontSize: '22px'
  },
  content: {
    padding: 0,
    margin: 0,
    minHeight: '100vh'
  },
  card: {
    width: '100%',
    // marginLeft: '3rem',
    marginTop: '3%'
  }
}

function CurrentProject ({ currentProjectData }) {
  const dataObject = currentProjectData()
  const [form] = AntForm.useForm()

  const [issue, setIssue] = useState([
    {
      id: dataObject._id,
      repoName: dataObject.name,
      title: '',
      body: ''
    }
  ])

  const onFinish = values => {
    const { title, body } = values

    API.addIssue({ repoName: dataObject.name, title, body }).then(res => {
      form.resetFields()
      setIssue([...issue, res.data])
    })
  }

  const onDelete = () => {
    API.deleteProject({ repo: dataObject.name, _id: dataObject._id }).then(() =>
      // setProjects(res.data)
      window.location.reload()
    )
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Content style={styling.content}>
        <Row justify='center'>
          <Col xl={10} lg={10} md={20} sm={20} xs={20}>
            <Card
              title='Project Feature Issues'
              headStyle={styling.header}
              style={styling.card}
            >
              <div>
                <p>Project name: {dataObject.name}</p>
                <p>Project Description: {dataObject.description}</p>
                <p>Project Skills: {dataObject.skills}</p>
              </div>
              <AntForm
                form={form}
                name='issue form'
                initialValues={{ title: '', body: '' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <AntForm.Item
                  // {...styling.formLayout}
                  label='Title'
                  rules={[
                    { required: true, message: 'Please input the issue title!' }
                  ]}
                  colon={false}
                  name='title'
                >
                  <Input />
                </AntForm.Item>
                <AntForm.Item
                  // {...styling.formLayout}
                  label='Description'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the issue description!'
                    }
                  ]}
                  colon={false}
                  name='body'
                >
                  <Input />
                </AntForm.Item>
                <AntForm.Item>
                  <Button type='primary' shape='round' htmlType='submit'>
                    Add Project Issue
                  </Button>
                </AntForm.Item>
              </AntForm>
            </Card>
          </Col>
          <Col className='gutter-row' xl={1} lg={1} md={0} sm={0} xs={0}></Col>
          <Col xl={10} lg={10} md={20} sm={20} xs={20}>
            <Card
              title='Project Status'
              headStyle={styling.header}
              style={styling.card}
            >
              <Button type='primary' shape='round' danger onClick={onDelete}>
                Delete Project
              </Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  )
}

export default CurrentProject
