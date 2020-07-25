// Import React dependencies
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// Import Menu and SubMenu components from ant design
import { Menu } from 'antd'

// Styling
const styling = {
  menu: {
    backgroundColor: '#353452'
  },
  item: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '1rem'
  }
}

// Right Menu component
function AltMenu (props) {
  const { order } = props
  const [current, setCurrent] = useState('mail')

  const handleClick = e => {
    // console.log('click ', e)
    setCurrent({ current: e.key })
  }

  // Function to scroll to the top of the page when called
  // calling react-scroll method

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode={order}
      style={styling.menu}
    >
      <Menu.Item key='signup'>
        <Link to='/signup' style={styling.item}>
          Sign Up
        </Link>
      </Menu.Item>
      <Menu.Item key='login'>
        <Link to='/login' style={styling.item}>
          Log In
        </Link>
      </Menu.Item>
    </Menu>
  )
}
// Export the component
export default AltMenu
