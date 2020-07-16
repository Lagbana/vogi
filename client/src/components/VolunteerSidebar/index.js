import React, { useState, useContext, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import {
  SettingOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'
import JoinedProjectContext from '../../utils/JoinedProjectContext'
import useWindowSize from '../../utils/useWindowSize'

const { Sider } = Layout
const { SubMenu } = Menu

function VolunteerSidebar ({ contentHandler }) {
  const [width, height] = useWindowSize()
  const [collapsed, setCollapsed] = useState(false)
  // const onCollapse = collapsed => {
  //   setCollapsed(collapsed)
  // }

  useEffect(() => {
    width < 767 ? setCollapsed(true) : setCollapsed(false)
  }, [width])
  const joinedProjects = useContext(JoinedProjectContext)

  const renderProjects = () => {
    return joinedProjects.map(project => (
      <Menu.Item key={project._id} onClick={() => contentHandler(project.name)}>
        {project.name}
      </Menu.Item>
    ))
  }

  return (
    <Sider
      theme='light'
      // collapsible
      collapsed={collapsed}
      // onCollapse={onCollapse}
    >
      <div />
      <Menu defaultSelectedKeys={['1']} mode='inline'>
        <Menu.Item
          onClick={() => contentHandler('Profile')}
          key='1'
          icon={<UserOutlined />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          onClick={() => contentHandler('New Project')}
          key='2'
          icon={<PlusOutlined />}
        >
          New Project
        </Menu.Item>
        <SubMenu
          key='sub1'
          icon={<UnorderedListOutlined />}
          title='Active Projects'
        >
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

export default VolunteerSidebar
