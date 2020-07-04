// Import React dependencies
import React, { useState } from 'react'
// Import Ant Design components
import { Menu } from 'antd'

// Left Menu Component
function LeftMenu(props) {
  const { order } = props
  const [current, setCurrent] = useState('mail')

  const handleClick = e => {
    console.log('click ', e)
    setCurrent({ current: e.key })
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode= {order}>
      <Menu.Item key='volunteers'>
        <a href='/'>Volunteers</a>
      </Menu.Item>
      <Menu.Item key='partners'>
        <a href='/'>Partners</a>
      </Menu.Item>
    </Menu>
  )
}
export default LeftMenu
