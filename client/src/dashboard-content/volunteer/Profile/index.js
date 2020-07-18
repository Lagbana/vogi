import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Button, Radio } from 'antd'
import API from '../../../utils/API'
import UserContext from '../../../utils/UserContext'

const styling = {
  formLayout: {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 16
    }
  },
  leftAlign: {
    textAlign: 'left'
  },
  button: {
    span: 24,
    align: 'center'
  }
}

function Profile () {
  const [form] = Form.useForm()
  const [message, setMessage] = useState('')

  const onFinish = values => {
    API.updateVolunteer(values)
      .then(res => {
        setMessage('You have updated your profile.')
        return res.data
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    API.getUser().then(res => {
      if (res.data.volunteerFirstName)
        form.setFieldsValue({ first: res.data.volunteerFirstName })
      if (res.data.volunteerLastName)
        form.setFieldsValue({ last: res.data.volunteerLastName })
      if (res.data.volunteerAbout)
        form.setFieldsValue({ about: res.data.volunteerAbout })
      if (res.data.volunteerSkills)
        form.setFieldsValue({ skills: res.data.volunteerSkills })
    })
  }, [])

  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          {...styling.formLayout}
          name='first'
          colon={false}
          label='First Name'
        >
          <Input placeholder='Enter your first name...' />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          name='last'
          colon={false}
          label='Last Name'
        >
          <Input placeholder='Enter your last name...' />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          name='skills'
          colon={false}
          label='Skills'
        >
          <Input placeholder='Your list of skills...' />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          name='about'
          colon={false}
          label='About'
        >
          <Input.TextArea placeholder='About you section...' />
        </Form.Item>
        <Form.Item>
          <div style={{ color: 'gray' }}>{message}</div>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            shape='round'
            style={styling.button}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Profile
