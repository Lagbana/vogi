import React from 'react'
import { Form as AntForm, Input, Button, Checkbox } from 'antd'

function Form () {
  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <AntForm
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <AntForm.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </AntForm.Item>

      <AntForm.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </AntForm.Item>

      <AntForm.Item name='remember' valuePropName='checked'>
        <Checkbox>Remember me</Checkbox>
      </AntForm.Item>

      <AntForm.Item>
        <Button type='primary' htmlType='submit'>
          Login
        </Button>
      </AntForm.Item>
    </AntForm>
  )
}

export default Form
