// Import React dependencies
import React, { useEffect } from 'react'
// Import antdesign components
import { Form, Input, Button, Radio, notification } from 'antd'
// Import API methods
import API from '../../../utils/API'
import useWindowSize from '../../../utils/useWindowSize'

function OrganizationInfo () {
  // Use the form methods from antdesign
  const [form] = Form.useForm()
  // Responsive Styling
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
      align: 'center',
      backgroundColor: '#FD4F64',
      border: 'none'
    },
    content: {
      minHeight: width > 767 ? '70vh' : '80vh'
    }
  }
  // Send a notification that the user has successfully updated the organization info
  const openNotification = type => {
    notification[type]({
      message: 'Organization Info Updated',
      description: 'You have successfully updated your organization profile.'
    })
  }

  // Update the partner user with information about the organization
  const onFinish = values => {
    API.updatePartner(values)
      .then(res => {
        openNotification('success')
        return res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
  // If the info exists set it into the inputs
  useEffect(() => {
    API.getUser().then(res => {
      if (res.data.organizationType)
        form.setFieldsValue({ type: res.data.organizationType })
      if (res.data.organizationName)
        form.setFieldsValue({ name: res.data.organizationName })
      if (res.data.organizationAbout)
        form.setFieldsValue({ about: res.data.organizationAbout })
    })
  }, [])

  return (
    <div style={styling.content}>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          {...styling.formLayout}
          style={styling.leftAlign}
          colon={false}
          name='type'
          label='Type'
        >
          <Radio.Group>
            <Radio.Button value='non-profit'>Non-Profit</Radio.Button>
            <Radio.Button value='start-up'>Start-Up</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Name'
          name='name'
        >
          <Input placeholder='The name of the organization' />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='About'
          name='about'
        >
          <Input.TextArea placeholder='About the organization' />
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
// Export the Component
export default OrganizationInfo
