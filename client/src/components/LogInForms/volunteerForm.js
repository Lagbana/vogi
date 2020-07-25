// Import React
import React from 'react'
// Import redirect from react-router-dom
import { Redirect } from 'react-router-dom'
// Import components from antdesign
import { Form as AntForm, Input, Button } from 'antd'
// Import API methods
import API from '../../utils/API'
// Use window size
import useWindowSize from '../../utils/useWindowSize'

function VolunteerLogIn () {
  // Responsive styling
  const [width] = useWindowSize()
  const styling = {
    formLayout: {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      }
    },
    responsiveMargin: {
      marginBottom: width > 550 ? 12 : 0
    }
  }
  // Use antdesign forms
  const [form] = AntForm.useForm()
  // Look for tokens in local storage and redirect to the dashboard
  const isAuthenticated = localStorage.getItem('tokens')
  if (isAuthenticated) return <Redirect to='/user/dashboard' />
  // Submit the information to the db and authenticate on login
  const onFinish = values => {
    const { email, password } = values
    API.logIn({ username: email, password, role: 'Volunteer' })
      .then(res => {
        console.log(res)
        form.resetFields()
        localStorage.setItem('tokens', JSON.stringify(res.data))
        localStorage.setItem('role', 'Volunteer')
        window.location.reload()
      })
      .catch(e => {
        console.log(e.response.data.message)
        if (e.response.status === 401) {
          form.setFields([
            {
              name: 'password',
              errors: ['Invalid email or password.']
            },
            {
              name: 'email',
              errors: [' ']
            }
          ])
        }
      })
  }
  // Console.log the error info if login fails
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <AntForm
      size={width > 550 ? 'default' : 'small'}
      form={form}
      name='volunteer form'
      initialValues={{ email: '', password: '', remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <AntForm.Item
        {...styling.formLayout}
        label='E-mail'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          { required: true, message: 'Please input your E-mail!' }
        ]}
        colon={false}
        name='email'
      >
        <Input placeholder='Enter your email...' />
      </AntForm.Item>
      <AntForm.Item
        {...styling.formLayout}
        label='Password'
        rules={[{ required: true, message: 'Please input your password!' }]}
        colon={false}
        name='password'
      >
        <Input.Password placeholder='Enter your password...' />
      </AntForm.Item>
      <AntForm.Item>
        <a className='login-form-forgot' href='/forgot'>
          Forgot password
        </a>
      </AntForm.Item>
      <AntForm.Item style={styling.responsiveMargin}>
        <Button
          style={{ backgroundColor: '#FD4F64', border: 'none' }}
          type='primary'
          shape='round'
          htmlType='submit'
        >
          Log In
        </Button>
      </AntForm.Item>
    </AntForm>
  )
}
// Export the component
export default VolunteerLogIn
