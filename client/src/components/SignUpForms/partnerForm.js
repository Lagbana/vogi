import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form as AntForm, Input, Button } from 'antd'
import API from '../../utils/API'
import useWindowSize from '../../utils/useWindowSize'

function PartnerSignUp () {
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
  const [form] = AntForm.useForm()
  const isAuthenticated = localStorage.getItem('tokens')
  if (isAuthenticated) return <Redirect to='/user/dashboard' />

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

  const lengthValidator = (rule, value) => {
    if (value.length > 5) {
      return Promise.resolve()
    }
    return Promise.reject('Password must be at least 6 characters.')
  }

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
        <Button shape='round' htmlType='submit' type='primary'>
          Sign Up
        </Button>
      </AntForm.Item>
    </AntForm>
  )
}
export default PartnerSignUp
