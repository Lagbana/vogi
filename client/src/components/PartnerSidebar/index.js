import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import {
  SettingOutlined,
  PlusOutlined,
  RiseOutlined,
  UserOutlined
} from '@ant-design/icons'
import API from '../../utils/API'

const { Sider } = Layout
const { SubMenu } = Menu

function PartnerSidebar ({ contentHandler }) {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }

  const [projects, setProjects] = useState([])
  useEffect(() => {
    API.getProjects().then(res => {
      const projectNames = res.data.map(item => item.name)
      setProjects(projectNames)
      return res.data
    })
  }, [])

  const renderProjects = () => {
    return projects.map(project => (
      <Menu.Item onClick={() => contentHandler(project + ' Progress')}>
        {project}
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
