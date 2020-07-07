// Import React dependencies
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// Import Menu and SubMenu components from ant design
import { Menu } from 'antd'

// Right Menu component
function AuthMenu (props) {
  const { order } = props
  const [current, setCurrent] = useState('mail')

  const handleClick = e => {
    console.log('click ', e)
    setCurrent({ current: e.key })
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode={order}>
      <Menu.Item key='volunteers'>
        <Link to='/'>Logout</Link>
      </Menu.Item>
    </Menu>
  )
}
export default AuthMenu
