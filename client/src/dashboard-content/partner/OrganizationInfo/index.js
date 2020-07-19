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

function OrganizationInfo () {
  const [form] = Form.useForm()
  const onFinish = values => {
    API.updatePartner(values).then(res => {
      form.resetFields()
      return res.data
    })
    console.log(values)
  }
  return (
    <>
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
    </>
  )
}

export default OrganizationInfo
