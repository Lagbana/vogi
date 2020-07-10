import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import { Form as AntForm, Input, Button, Divider } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import API from '../../utils/API'
import { useAuth } from '../../utils/auth'

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

function Form (props) {
  const { setAuthTokens } = useAuth()
  const { buttonName, history } = props
  const [form] = AntForm.useForm()

  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    error: ''
  })

  const isAuthenticated = localStorage.getItem('tokens')
  if (isAuthenticated) return <Redirect to='/user/dashboard' />

  const handleInputChanged = event => {
    const { name, value } = event.target

    setNewUser({
      [name]: value
    })
  }

  // const handleLogin = async event => {
  //   event.preventDefault()

  //   const { username, password } = newUser

  //   // clear any previous errors
  //   setNewUser({ error: '' })

  //   if (!username || !password) {
  //     setNewUser({ error: 'A username and password is required' })
  //     return
  //   }

  //   try {
  //     // POST an auth request to create new user (using local strategy)
  //     await API.createUser({ username, password })
  //     history.push('/dashboard')
  //   } catch (err) {
  //     setNewUser({
  //       error: err.response.data.message || err.message
  //     })
  //   }
  // }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <AntForm
      form={form}
      name='basic'
      initialValues={{ remember: true }}
      // onFinish={handleLogin}
      onFinishFailed={onFinishFailed}
    >
      <AntForm.Item
        {...styling.formLayout}
        label='Username'
        rules={[{ required: true, message: 'Please input your username!' }]}
        colon={false}
      >
        <Input name='username' onChange={handleInputChanged} />
      </AntForm.Item>

      <AntForm.Item
        {...styling.formLayout}
        label='Password'
        rules={[{ required: true, message: 'Please input your password!' }]}
        colon={false}
      >
        <Input.Password name='password' onChange={handleInputChanged} />
      </AntForm.Item>
      <AntForm.Item>
        <Button
          type='primary'
          shape='round'
          htmlType='submit'
          // onClick={handleLogin}
        >
          {buttonName}
        </Button>
      </AntForm.Item>
      <Divider>or</Divider>
      <AntForm.Item>
        <Button
          style={styling.githubButton}
          type='primary'
          shape='round'
          htmlType='button'
          onClick={() =>
            window.open('http://localhost:8080/v1/api/auth/github/', '_self')
          }
        >
          <GithubOutlined />
          Continue with GitHub
        </Button>
      </AntForm.Item>
    </AntForm>
  )
}

export default Form
