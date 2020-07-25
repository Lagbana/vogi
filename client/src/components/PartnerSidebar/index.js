// Import React dependencies
import React, { useState, useContext, useEffect } from 'react'
// Import components from antdesign
import { Layout, Menu } from 'antd'
// Import icons from antdesign
import {
  SettingOutlined,
  PlusOutlined,
  RiseOutlined,
  UserOutlined
} from '@ant-design/icons'
// Import Context API
import CreatedProjectContext from '../../utils/CreatedProjectContext'
// Import windowsize
import useWindowSize from '../../utils/useWindowSize'
// Destructure components from antdesign
const { Sider } = Layout
const { SubMenu } = Menu
// Destructure props
function PartnerSidebar ({ contentHandler, currentProjectHandler }) {
  // Responsive styling
  const [width, height] = useWindowSize()
  const [collapsed, setCollapsed] = useState(false)

  const styling = {
    responsiveMargin: {
      marginLeft: width < 767 ? -14 : 0
    },
    topPadding: {
      paddingTop: width < 767 ? '5px' : '10px'
    }
  }
  // Look at the width of the screen and make it responsive
  useEffect(() => {
    width < 767 ? setCollapsed(true) : setCollapsed(false)
  }, [width])

  const projects = useContext(CreatedProjectContext)
  // Render the projects on the sidebar
  const renderProjects = () => {
    return projects.map(project => (
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
      collapsed={collapsed}
      size='large'
      collapsedWidth='50px'
      style={{
        overflow: 'auto',
        borderRight: '1px solid #C4C4C4',
        fixed: true
      }}
    >
      <Menu
        defaultSelectedKeys={['1']}
        mode='inline'
        style={styling.topPadding}
      >
        <Menu.Item
          onClick={() => contentHandler('Organization Information')}
          key='1'
          style={{ paddingLeft: '18px' }}
          icon={<UserOutlined />}
        >
          Organization Info
        </Menu.Item>
        <Menu.Item
          onClick={() => contentHandler('Create New Project')}
          key='2'
          style={{ paddingLeft: '18px' }}
          icon={<PlusOutlined />}
        >
          Create New Project
        </Menu.Item>
        <SubMenu
          key='sub1'
          icon={<RiseOutlined />}
          title='Current Progress'
          style={styling.responsiveMargin}
        >
          {renderProjects()}
        </SubMenu>
        {/* <Menu.Item
          onClick={() => contentHandler('Settings')}
          key='4'
          icon={<SettingOutlined />}
          style={{ paddingLeft: '18px' }}
        >
          Settings
        </Menu.Item> */}
      </Menu>
    </Sider>
  )
}
// Export the sidebar
export default PartnerSidebar
