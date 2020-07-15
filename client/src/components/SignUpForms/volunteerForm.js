import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form as AntForm, Input, Button } from 'antd'
import API from '../../utils/API'

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

function VolunteerSignUp () {
  const [form] = AntForm.useForm()
  const isAuthenticated = localStorage.getItem('tokens')
  if (isAuthenticated) return <Redirect to='/user/dashboard' />

  const onFinish = values => {
    API.createUser({ ...values, role: 'Volunteer' }).then(res => {
      form.resetFields()
      localStorage.setItem('tokens', JSON.stringify(res.data))
      localStorage.setItem('role', 'Volunteer')
      window.location.reload()
    })
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
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
          <Input />
        </AntForm.Item>
        <AntForm.Item
          {...styling.formLayout}
          label='Password'
          rules={[{ required: true, message: 'Please input your password!' }]}
          colon={false}
          name='password'
        >
          <Input.Password />
        </AntForm.Item>
        <AntForm.Item>
          <Button type='primary' shape='round' htmlType='submit'>
            Sign Up
          </Button>
        </AntForm.Item>
      </AntForm>
    </>
  )
}

export default VolunteerSignUp
