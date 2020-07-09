import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  SettingOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu

function VolunteerSidebar () {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }
  return (
    <Sider
      theme='light'
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div />
      <Menu defaultSelectedKeys={['1']} mode='inline'>
        <Menu.Item key='1' icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key='2' icon={<PlusOutlined />}>
          New Project
        </Menu.Item>
        <SubMenu
          key='sub1'
          icon={<UnorderedListOutlined />}
          title='Active Projects'
        >
          <Menu.Item key='3'>Project 1</Menu.Item>
          <Menu.Item key='4'>Project 2</Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<SettingOutlined />} title='Settings'>
          <Menu.Item key='5'>Setting 1</Menu.Item>
          <Menu.Item key='6'>Setting 2</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default VolunteerSidebar
