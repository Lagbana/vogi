import React from 'react'
import { Form, Input, Button } from 'antd'
import useWindowSize from '../../../utils/useWindowSize'

function NewProject ({ onFinish, form, projectValidator }) {
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
    formSize: width > 950 ? 'default' : 'small'
  }

  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Name'
          name='name'
          rules={[
            { required: true, message: 'Please enter the project name' },
            { validator: projectValidator }
          ]}
        >
          <Input placeholder='Enter the name of your project' />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Description'
          name='description'
          rules={[
            { required: true, message: 'Please enter the project description' }
          ]}
        >
          <Input.TextArea placeholder='Describe your project objectives' />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Skills Required'
          name='skills'
        >
          <Input placeholder='List the skills your require separated by comma' />
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
