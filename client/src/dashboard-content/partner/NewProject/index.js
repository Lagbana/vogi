import React from 'react'
import { Form, Input, Button } from 'antd'
import API from '../../../utils/API'

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
  const [form] = Form.useForm()
  const onFinish = values => {
    console.log('Success:', values)
    API.createProject(values).then(res => {
      console.log(res)
      form.resetFields()
      return res
    })
  }
  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Project Name'
          name='name'
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Project Description'
          name='description'
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Skills Required'
          name='skills'
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Team'
          name='team'
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            shape='round'
            style={styling.button}
            htmlType='submit'
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default NewProject
