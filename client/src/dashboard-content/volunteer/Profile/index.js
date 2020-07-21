import React, { useEffect } from 'react'
import { Form, Input, Button, notification } from 'antd'
import API from '../../../utils/API'
import useWindowSize from '../../../utils/useWindowSize'

function Profile () {
  const [width] = useWindowSize()
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
    },
    content: {
      minHeight: width > 767 ? '70vh' : '80vh'
    }
  }
  const [form] = Form.useForm()
  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Profile Updated',
      description: 'You have successfully updated your profile.'
    })
  }

  const onFinish = values => {
    API.updateVolunteer(values)
      .then(res => {
        openNotificationWithIcon('success')
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
    <div style={styling.content}>
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
    </div>
  )
}

export default Profile
