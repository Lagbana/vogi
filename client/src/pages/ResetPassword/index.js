import React, {useState} from 'react'
import { Form as AntForm, Input, Button, notification } from 'antd'
import API from '../../utils/API'
import { Layout, Card, Row, Col, Divider } from 'antd'
import Navbar from '../../components/Navbar'
import useWindowSize from '../../utils/useWindowSize'
import { useLocation, Redirect } from 'react-router-dom'

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
    description: 'You have successfully changed your password.'
  })
}

const ResetPassword = () => {
  const [form] = AntForm.useForm()
  const [width, height] = useWindowSize()
  const [redirect, setRedirect] = useState(false)

  const styling = {
    header: {
      border: 'none',
      color: '#353452',
      fontSize: width > 990 ? 22 : 20
    },
    cardInfo: {
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
      border: '1px #C4C4C4 solid',
      borderRadius: '15px'
    }
  }

  /*
    @param values: Object of strings; form input values
    If successful, reset form and redirect to login page
  */
  const onFinish = values => {
    console.log('Success:', values)
    API.resetPassword(values).then(res => {
      openNotification('success')
      form.resetFields()
      setRedirect(true)
      return res
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  // React method to get the path name and return as string
  const { pathname } = useLocation()

  // Redirect to login page if password is successfully reset
  if (redirect) {
    return <Redirect to='/login' />
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
                  Enter your a new password and confirm.
                </h4>
              </div>
              <AntForm
                {...layout}
                name='basic'
                onFinish={values =>
                  onFinish({
                    ...values,
                    token: pathname.split('/reset/').pop()
                  })
                }
                onFinishFailed={onFinishFailed}
              >
                <AntForm.Item
                  name='password'
                  label='Password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!'
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </AntForm.Item>
                <AntForm.Item
                  name='confirm'
                  label='Confirm Password'
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    ({ getFieldValue }) => ({
                      validator (rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(
                          'The two passwords that you entered do not match!'
                        )
                      }
                    })
                  ]}
                >
                  <Input.Password />
                </AntForm.Item>
                <AntForm.Item {...tailLayout}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    shape='round'
                    style={{ backgroundColor: '#FD4F64', border: 'none' }}
                  >
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

export default ResetPassword
