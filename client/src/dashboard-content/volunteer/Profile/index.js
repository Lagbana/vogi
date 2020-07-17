import React from 'react'
import { Form, Input, Button, Radio } from 'antd'
import API from '../../../utils/API'

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
  const onFinish = values => {
    API.updateVolunteer(values).then(res => {
      form.resetFields()
      return res.data
    })
  }
  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          {...styling.formLayout}
          name='first'
          colon={false}
          label='First Name'
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          name='last'
          colon={false}
          label='Last Name'
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          name='skills'
          colon={false}
          label='Skills'
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          name='about'
          colon={false}
          label='About'
        >
          <Input.TextArea />
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
