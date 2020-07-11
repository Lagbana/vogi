import React from 'react'
import { Form, Input, Button, Radio } from 'antd'

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
  return (
    <>
      <Form>
        <Form.Item {...styling.formLayout} colon={false} label='First Name'>
          <Input />
        </Form.Item>
        <Form.Item {...styling.formLayout} colon={false} label='Last Name'>
          <Input />
        </Form.Item>
        <Form.Item {...styling.formLayout} colon={false} label='Skills'>
          <Input />
        </Form.Item>
        <Form.Item {...styling.formLayout} colon={false} label='About'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type='primary' shape='round' style={styling.button}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Profile
