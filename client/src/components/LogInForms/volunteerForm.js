import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form as AntForm, Input, Button, Divider } from 'antd'
import API from '../../utils/API'
import { GithubOutlined } from '@ant-design/icons'

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
  }
}

function VolunteerLogIn () {
  const [form] = AntForm.useForm()
  const isAuthenticated = localStorage.getItem('tokens')
  if (isAuthenticated) return <Redirect to='/user/dashboard' />

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

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <AntForm
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
        <Button type='primary' shape='round' htmlType='submit'>
          Log In
        </Button>
      </AntForm.Item>
      <Divider>or</Divider>
      <AntForm.Item>
        <Button style={styling.githubButton} type='primary' shape='round'>
          <GithubOutlined />
          Continue with GitHub
        </Button>
      </AntForm.Item>
    </AntForm>
  )
}

export default VolunteerLogIn
