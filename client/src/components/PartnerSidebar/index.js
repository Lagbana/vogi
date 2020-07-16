import React, { useState, useContext } from 'react'
import { Layout, Menu } from 'antd'
import {
  SettingOutlined,
  PlusOutlined,
  RiseOutlined,
  UserOutlined
} from '@ant-design/icons'
import CreatedProjectContext from '../../utils/CreatedProjectContext'

const { Sider } = Layout
const { SubMenu } = Menu

function PartnerSidebar ({ contentHandler }) {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }
  const projects = useContext(CreatedProjectContext)

  const renderProjects = () => {
    return projects.map(project => (
      <Menu.Item key={project._id} onClick={() => contentHandler(project.name)}>
        {project.name}
      </Menu.Item>
    ))
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
        <Menu.Item
          onClick={() => contentHandler('Organization Information')}
          key='1'
          icon={<UserOutlined />}
        >
          Organization Info
        </Menu.Item>
        <Menu.Item
          onClick={() => contentHandler('Create New Project')}
          key='2'
          icon={<PlusOutlined />}
        >
          Create New Project
        </Menu.Item>
        <SubMenu key='sub1' icon={<RiseOutlined />} title='Current Progress'>
          {renderProjects()}
        </SubMenu>
        <SubMenu key='sub2' icon={<SettingOutlined />} title='Settings'>
          <Menu.Item onClick={() => contentHandler('Setting 1')} key='5'>
            Setting 1
          </Menu.Item>
          <Menu.Item onClick={() => contentHandler('Setting 2')} key='6'>
            Setting 2
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default PartnerSidebar
