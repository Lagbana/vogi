// Import React dependencies
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// Import Menu and SubMenu components from ant design
import { Menu } from 'antd'
import API from '../../utils/API'

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
function AuthMenu (props) {
  const { order } = props
  const [current, setCurrent] = useState('mail')

  const handleClick = e => {
    // console.log('click ', e)
    setCurrent({ current: e.key })
  }
  // Log the user out of the session
  const handleLogout = async () => {
    try {
      await API.logOut()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode={order}
      style={styling.menu}
    >
      <Menu.Item key='volunteers'>
        <Link to='/' onClick={handleLogout} style={styling.item}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  )
}
//Export the component
export default AuthMenu
