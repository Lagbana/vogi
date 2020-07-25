// Import React
import React from 'react'
// Import Redirect from react-router-dom
import { Redirect } from 'react-router-dom'
// Import antdesign components
import { Form as AntForm, Input, Button } from 'antd'
// Import methods from API
import API from '../../utils/API'
// Import window size
import useWindowSize from '../../utils/useWindowSize'

function PartnerSignUp () {
  // Responsive Styling
  const [width, height] = useWindowSize()
  const styling = {
    formLayout: {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      }
    },
    githubButton: {
      backgroundColor: 'black',
      border: 'none'
    },
    responsiveMargin: {
      marginBottom: width > 575 ? 12 : 0
    }
  }
  // use antdesign form methods
  const [form] = AntForm.useForm()
  // Get tokens from local storage
  const isAuthenticated = localStorage.getItem('tokens')
  // Redirect to the user dashboard
  if (isAuthenticated) return <Redirect to='/user/dashboard' />
  // On successful signup create a user
  const onFinish = values => {
    const { email, password } = values
    API.createUser({ username: email, password, role: 'Partner' })
      .then(res => {
        form.resetFields()
        localStorage.setItem('role', 'Partner')
        localStorage.setItem('tokens', JSON.stringify(res.data))
        window.location.reload()
      })
      .catch(e => {
        if (e.response && e.response.data) {
          form.setFields([
            {
              name: 'email',
              errors: [e.response.data.message]
            }
          ])
        }
      })
  }
  // Validate password length
  const lengthValidator = (rule, value) => {
    if (value.length > 5) {
      return Promise.resolve()
    }
    return Promise.reject('Password must be at least 6 characters.')
  }
  // Console.log the error if signup fails
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <AntForm
      size={width > 575 ? 'default' : 'small'}
      form={form}
      name='partner form'
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
            message: 'The input is not a valid E-mail!'
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
        rules={[
          { validator: lengthValidator },
          { required: true, message: ' ' }
        ]}
        colon={false}
        name='password'
      >
        <Input.Password placeholder='Choose a password...' />
      </AntForm.Item>
      <AntForm.Item>
        <Button
          style={{ backgroundColor: '#FD4F64', border: 'none' }}
          shape='round'
          htmlType='submit'
          type='primary'
        >
          Sign Up
        </Button>
      </AntForm.Item>
    </AntForm>
  )
}
// Export the component
export default PartnerSignUp
