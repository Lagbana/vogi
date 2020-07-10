import React from 'react'
import { Form, Input, Button } from 'antd'

const styling = {
  formLayout: {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 16
    }
  }
}

function NewProject () {
  return (
    <>
      <Form>
        <Form.Item {...styling.formLayout} colon={false} label='Project Name'>
          <Input />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Project Description'
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Skills Required'
        >
          <Input />
        </Form.Item>
        <Form.Item {...styling.formLayout} colon={false} label='Team'>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' shape='round' style={styling.button}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default NewProject
