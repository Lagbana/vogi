import React from 'react'
import { Form as AntForm, Input, Button, Checkbox } from 'antd'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 }
}

function Form ({ buttonName }) {
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
      {...layout}
    >
      <AntForm.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
        colon={false}
      >
        <Input />
      </AntForm.Item>

      <AntForm.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
        colon={false}
      >
        <Input.Password />
      </AntForm.Item>

      <AntForm.Item name='remember' valuePropName='checked'>
        <Checkbox>Remember me</Checkbox>
      </AntForm.Item>

      <AntForm.Item>
        <Button type='primary' htmlType='submit'>
          {buttonName}
        </Button>
      </AntForm.Item>
    </AntForm>
  )
}

export default Form
