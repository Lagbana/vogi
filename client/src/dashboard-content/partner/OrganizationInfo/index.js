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

function OrganizationInfo () {
  return (
    <>
      <Form>
        <Form.Item
          {...styling.formLayout}
          style={styling.leftAlign}
          colon={false}
          name='radio-button'
          label='Type of Organization'
        >
          <Radio.Group>
            <Radio.Button value='a'>Non-Profit</Radio.Button>
            <Radio.Button value='b'>Start-Up</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Organization Name'
        >
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

export default OrganizationInfo
