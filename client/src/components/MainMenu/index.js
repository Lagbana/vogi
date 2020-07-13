// Import React dependencies
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// Import Menu and SubMenu components from ant design
import { Menu } from 'antd'

// Right Menu component
function MainMenu (props) {
  const { order } = props
  const [current, setCurrent] = useState('mail')

  const handleClick = e => {
    // console.log('click ', e)
    setCurrent({ current: e.key })
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode={order}>
      <Menu.Item key='volunteers'>
        <Link to='/'>Volunteers</Link>
      </Menu.Item>
      <Menu.Item key='partners'>
        <Link to='/'>Partners</Link>
      </Menu.Item>
      <Menu.Item key='signup'>
        <Link to='/signup'>Sign Up</Link>
      </Menu.Item>
      <Menu.Item key='login'>
        <Link to='/login'>Log In</Link>
      </Menu.Item>
    </Menu>
  )
}
export default MainMenu
