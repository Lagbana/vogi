import React, { useState, useEffect } from 'react'
import {
  Layout,
  Card,
  Row,
  Col,
  Form as AntForm,
  Input,
  Button,
  List
} from 'antd'
import { CarryOutOutlined } from '@ant-design/icons'
import API from '../../../utils/API'

const { Content } = Layout
const { TextArea } = Input

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

  const [issuesData, setIssuesData] = useState([])
  const [issuesProgress, setIssuesProgress] = useState({})

  useEffect(() => {
    const repoName = dataObject.name.trim()
    API.getAllIssues(repoName).then(res => {
      const issues = res.data[0]
      const progress = res.data[1]

      setIssuesData(issues)
      setIssuesProgress(progress)
    })
  }, [])

  const onFinish = values => {
    const { title, body } = values
    API.addIssue({ repoName: dataObject.name, title, body }).then(res => {
      form.resetFields()
    })
  }

  const onDelete = () => {
    API.deleteProject({ repo: dataObject.name, _id: dataObject._id }).then(() =>
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
                <h3>Create Project Issues</h3>
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
                      {
                        required: true,
                        message: 'Please input the issue title!'
                      }
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
                    <TextArea rows={4} />
                  </AntForm.Item>
                  <AntForm.Item>
                    <Button type='primary' shape='round' htmlType='submit'>
                      Add Project Issue
                    </Button>
                  </AntForm.Item>
                </AntForm>
              </div>

              <div
                style={{
                  wordWrap: 'break-word',
                  marginTop: '3.5rem',
                  backgroundColor: '#F8F8F8',
                  width: '100%',
                  // maginLeft: 'auto',
                  // marginRight: 'auto',
                }}
              >
                {/* <Timeline>
                  {issuesData.map(item => <Timeline.Item>{item.title}</Timeline.Item>)}
                </Timeline> */}
                <h3 style={{paddingTop: "2rem"}}>View all issues</h3>
                <List
                  itemLayout='horizontal'
                  split={false}
                  dataSource={issuesData}
                  renderItem={item => {
                    const iconColor =
                      item.state === 'open' ? '#87d068' : '#c4c4c4'
                    return (
                      <List.Item
                        style={{
                          textAlign: 'left',
                          marginLeft: '2rem',
                        }}
                      >
                        <CarryOutOutlined style={{ color: iconColor, fontSize: '2.5vh' }} />{' '}
                        {item.title}
                      </List.Item>
                    )
                  }}
                />
              </div>
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
