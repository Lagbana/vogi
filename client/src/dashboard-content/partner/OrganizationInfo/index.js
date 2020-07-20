import React, { useEffect } from 'react'
import { Form, Input, Button, Radio, notification } from 'antd'
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
  content: {
    minHeight: '100vh'
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
  const [form] = Form.useForm()

  const openNotification = type => {
    notification[type]({
      message: 'Organization Info Updated',
      description: 'You have successfully updated your organization profile.'
    })
  }

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
          label='Type of Organization'
        >
          <Radio.Group>
            <Radio.Button value='non-profit'>Non-Profit</Radio.Button>
            <Radio.Button value='start-up'>Start-Up</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='Organization Name'
          name='name'
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          colon={false}
          label='About'
          name='about'
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
    </div>
  )
}

export default OrganizationInfo
