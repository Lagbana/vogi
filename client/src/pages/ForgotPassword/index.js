import React from 'react'
import { Form as AntForm, Input, Button, notification } from 'antd'
import API from '../../utils/API'
import { Layout, Card, Row, Col, Divider } from 'antd'
import Navbar from '../../components/Navbar'
import useWindowSize from '../../utils/useWindowSize'
const { Content } = Layout

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 16
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16
  }
}

const openNotification = type => {
  notification[type]({
    message: 'Reset Email',
    description: 'Please check your email for the reset instructions.'
  })
}

const ForgotPassword = () => {
  const [form] = AntForm.useForm()
  const [width, height] = useWindowSize()

  const styling = {
    header: {
      border: 'none',
      color: '#1890ff',
      fontSize: width > 990 ? 22 : 20
    },
    cardInfo: {
      //   marginTop: '0.5rem',
      marginBottom: '2rem'
    },
    content: {
      paddingTop: width > 990 ? 24 : 16,
      margin: 0,
      minHeight: '80vh',
      backgroundColor: '#F8F8F8'
    },
    card: {
      width: '100%',
      marginLeft: '0rem',
      marginBottom: width > 990 ? '0%' : '4%',
      marginTop: width > 990 ? '10%' : '0%',
      border: '1px #C4C4C4 solid'
    }
  }

  const onFinish = values => {
    console.log('Success:', values)
    API.resetPasswordEmail(values).then(res => {
      openNotification('success')
      form.resetFields()
      return res
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Navbar />
      <Content style={styling.content}>
        <Row justify='center'>
          <Col xl={10} lg={10} md={18} sm={20} xs={22}>
            <Card
              size={width > 767 ? 'default' : 'small'}
              shape='round'
              title='Reset Password'
              headStyle={styling.header}
              style={styling.card}
            >
              <div>
                <h4 style={styling.cardInfo}>
                  Enter your email address and we will send you instructions on
                  how to reset your password.
                </h4>
              </div>
              <AntForm
                {...layout}
                name='basic'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <AntForm.Item
                  label='Email'
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!'
                    }
                  ]}
                >
                  <Input placeholder='Enter email address' />
                </AntForm.Item>
                <AntForm.Item {...tailLayout}>
                  <Button type='primary' htmlType='submit'>
                    Reset Password
                  </Button>
                </AntForm.Item>
              </AntForm>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  )
}

export default ForgotPassword
