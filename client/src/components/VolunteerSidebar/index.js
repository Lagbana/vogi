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

function VolunteerSidebar ({ contentHandler, currentProjectHandler }) {
  const [width, height] = useWindowSize()
  const [collapsed, setCollapsed] = useState(false)
  // const onCollapse = collapsed => {
  //   setCollapsed(collapsed)
  // }

  const styling = {
    responsiveMargin: {
      marginLeft: width < 767 ? -14 : 0
    },
    topPadding: {
      paddingTop: width < 767 ? '5px' : '10px'
    }
  }

  useEffect(() => {
    width < 767 ? setCollapsed(true) : setCollapsed(false)
  }, [width])
  const joinedProjects = useContext(JoinedProjectContext)

  const renderProjects = () => {
    return joinedProjects.map(project => (
      <Menu.Item
        key={project._id}
        onClick={() => currentProjectHandler(project._id)}
      >
        {project.name}
      </Menu.Item>
    ))
  }

  return (
    <Sider
      theme='light'
      // collapsible
      collapsed={collapsed}
      size='large'
      collapsedWidth='50px'
      style={{
        overflow: 'auto',
        borderRight: '1px solid #C4C4C4',
        fixed: true
      }}
      // onCollapse={onCollapse}
      // style={{ minWidth: '0px', padding: '0', margin: '0', width: '10px' }}
    >
      <Menu
        defaultSelectedKeys={['1']}
        mode='inline'
        style={styling.topPadding}
      >
        <Menu.Item
          onClick={() => contentHandler('Profile')}
          key='1'
          style={{ paddingLeft: '18px' }}
          icon={<UserOutlined />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          onClick={() => contentHandler('Join a New Project')}
          key='2'
          icon={<PlusOutlined />}
          style={{ paddingLeft: '18px' }}
        >
          New Project
        </Menu.Item>
        <SubMenu
          key='sub1'
          icon={<UnorderedListOutlined />}
          title='Active Projects'
          style={styling.responsiveMargin}
        >
          {renderProjects()}
        </SubMenu>
        <Menu.Item
          onClick={() => contentHandler('Settings')}
          key='3'
          icon={<SettingOutlined />}
          style={{ paddingLeft: '18px' }}
        >
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default VolunteerSidebar
