import React, { useState, useEffect } from 'react'
import {
  Layout,
  Card,
  Row,
  Col,
  Form as AntForm,
  Input,
  Button,
  Steps,
  List,
  notification,
  Progress
} from 'antd'
import { CarryOutOutlined } from '@ant-design/icons'
import API from '../../../utils/API'
import useWindowSize from '../../../utils/useWindowSize'

const { Content } = Layout
const { TextArea } = Input

function CurrentProject ({ currentProject }) {
  const [width] = useWindowSize()
  const styling = {
    wrapper: {},
    header: {
      border: 'none',
      color: '#1890ff',
      fontSize: width > 767 ? '22px' : '20px',
      marginBottom: 0
    },
    content: {
      padding: 0,
      margin: 0,
      minHeight: '100vh'
    },
    card: {
      width: '100%',
      marginTop: '3%'
    },
    cardBody: {
      paddingTop: 0
    },
    content: {
      minHeight: width > 767 ? '70vh' : '80vh'
    },
    size: width > 767 ? 'default' : 'small',
    list: {
      minHeight: 175
    }
  }

  const [form] = AntForm.useForm()
  const [issuesData, setIssuesData] = useState([])
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const repoName = currentProject.name.trim()
    API.getAllIssues(repoName).then(res => {
      const issues = res.data[0]
      const progress = res.data[1]
      setIssuesData(issues)
      console.log(progress)
      const value = Math.round(
        (progress.closedIssues / progress.totalIssues) * 100
      )
      value === NaN ? setPercent(0) : setPercent(value)
    })
  }, [currentProject])

  const openNotification = type => {
    notification[type]({
      message: 'Issue Created',
      description: 'You have successfully created a new project issue.'
    })
  }

  const onFinish = values => {
    const { title, body } = values
    API.addIssue({ repoName: currentProject.name, title, body }).then(res => {
      form.resetFields()
      openNotification('success')
      setIssuesData([
        { title: title, body: body, state: 'open' },
        ...issuesData
      ])
    })
  }

  const onDelete = () => {
    API.deleteProject({
      repo: currentProject.name,
      _id: currentProject._id
    }).then(() => window.location.reload())
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={styling.content}>
      <Content style={styling.content}>
        <Row justify='center'>
          <Col xl={10} lg={10} md={20} sm={20} xs={20}>
            <Card
              size={styling.size}
              title='Project Actions'
              headStyle={styling.header}
              style={styling.card}
              bodyStyle={styling.cardBody}
            >
              <div>
                <h3>Create Project Issues</h3>
                <AntForm
                  size={styling.size}
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
                  <p
                    style={{
                      color: 'red',
                      paddingTop: width > 767 ? '1rem' : 0
                    }}
                  >
                    Warning: Deleting the project erases your project from the
                    database as well as the files on GitHub.
                  </p>
                  <Button
                    type='primary'
                    shape='round'
                    danger
                    onClick={onDelete}
                  >
                    Delete Project
                  </Button>
                </AntForm>
              </div>
            </Card>
          </Col>

          <Col className='gutter-row' xl={1} lg={1} md={0} sm={0} xs={0}></Col>
          <Col xl={10} lg={10} md={20} sm={20} xs={20}>
            <Card
              size={styling.size}
              title='Project Status'
              headStyle={styling.header}
              style={styling.card}
              bodyStyle={styling.cardBody}
            >
              <div
                style={{
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                  backgroundColor: '#F8F8F8',
                  width: '100%'
                }}
              >
                {/* <Timeline>
                  {issuesData.map(item => <Timeline.Item>{item.title}</Timeline.Item>)}
                </Timeline> */}
                <h3 style={{ paddingTop: '0.5rem' }}>Issues</h3>
                <List
                  style={styling.list}
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
                          marginLeft: '2rem'
                        }}
                      >
                        <CarryOutOutlined
                          style={{
                            color: iconColor,
                            fontSize: '2.5vh',
                            marginRight: 5
                          }}
                        />
                        {item.title}
                      </List.Item>
                    )
                  }}
                />
              </div>
              <br />
              <Progress width={80} type='circle' percent={percent} />
              <br />
              <br />
              <Button
                size={width > 767 ? 'default' : 'small'}
                type='primary'
                shape='round'
                onClick={() =>
                  window.open(
                    `https://github.com/vogiPartner/${currentProject.name}`,
                    '_blank'
                  )
                }
              >
                View Repository
              </Button>
            </Card>
          </Col>
        </Row>
      </Content>
    </div>
  )
}

export default CurrentProject
