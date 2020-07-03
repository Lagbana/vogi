import React from 'react'
import { Form as AntForm, Input, Button, Checkbox } from 'antd'

function Form () {
  return (
    <AntForm
      name='basic'
      initialValues={{
        remember: true
      }}
    >
      <AntForm.Item
        label='Username'
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          }
        ]}
      >
        <Input />
      </AntForm.Item>

      <AntForm.Item
        label='Password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          }
        ]}
      >
        <Input.Password />
      </AntForm.Item>

      <AntForm.Item name='remember' valuePropName='checked'>
        <Checkbox>Remember me</Checkbox>
      </AntForm.Item>

      <AntForm.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </AntForm.Item>
    </AntForm>
  )
}

export default Form
