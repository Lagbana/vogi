// Import react
import React from 'react'
// Import antdesign components
import { Form, Input, Button } from 'antd'
// UseWindow size for responsiveness
import useWindowSize from '../../../utils/useWindowSize'
// Take in props
function NewProject ({ onFinish, form, projectValidator }) {
  // Responsive styling
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
    formSize: width > 950 ? 'default' : 'small',
    content: {
      minHeight: width > 767 ? '70vh' : '80vh'
    },
    button: {
      backgroundColor: '#FD4F64',
      border: 'none'
    }
  }

  return (
    <div style={styling.content}>
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
          <Input placeholder='List the skills you require separated by a comma' />
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
    </div>
  )
}
// Export the component
export default NewProject
