import React from 'react'
import { Form as AntForm, Input, Button, Checkbox, Divider } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
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

function Form ({ buttonName, page }) {
  const onFinish = values => {
    if (page === 'partnerSignup') {
      API.savePartner({
        username: values.username,
        password: values.password
      }).catch(err => console.log(err))
    }
    if (page === 'volunteerSignup') {
      API.saveVolunteer({
        username: values.username,
        password: values.password
      }).catch(err => console.log(err))
    }
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
        {...styling.formLayout}
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
        colon={false}
      >
        <Input />
      </AntForm.Item>

      <AntForm.Item
        {...styling.formLayout}
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
        <Button type='primary' shape='round' htmlType='submit'>
          {buttonName}
        </Button>
      </AntForm.Item>
      <Divider>or</Divider>
      <AntForm.Item>
        <Button
          style={styling.githubButton}
          type='primary'
          shape='round'
          htmlType='submit'
        >
          <GithubOutlined />
          Continue with GitHub
        </Button>
      </AntForm.Item>
    </AntForm>
  )
}

export default Form
