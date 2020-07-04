// Import React dependencies
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// Import Menu and SubMenu components from ant design
import { Menu } from 'antd'
const SubMenu = Menu.SubMenu

// Right Menu component
function RightMenu (props) {
  const { order } = props
  const [current, setCurrent] = useState('mail')

  const handleClick = e => {
    console.log('click ', e)
    setCurrent({ current: e.key })
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode={order}>
      <SubMenu title='Signup'>
        <Menu.Item key='partnerSignup'>
          <Link to='/signup/partner'>Partner</Link>
        </Menu.Item>
        <Menu.Item key='volunteerSignup'>
          <Link to='/signup/volunteer'>Volunteer</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key='login'>
        <Link to='/login'>Login</Link>
      </Menu.Item>
    </Menu>
  )
}
export default RightMenu
