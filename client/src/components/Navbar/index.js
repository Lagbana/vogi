import React, { useState } from 'react'
import MainMenu from '../MainMenu'
import AuthMenu from '../AuthMenu'
import { Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Logo from '../../resources/logo1.png'
import './style.css'

function Navbar ({ authenticated }) {
  //   const [current, setCurrent] = useState('mail')
  const [visible, setVisible] = useState(false)

  const styling = {
    logo: {
      maxHeight: '4.5rem'
    }
  }

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <nav
      className='menuBar'
      style={{
        borderBottom: '1px solid #C4C4C4',
        backgroundColor: '#353452',
        color: '#ffffff'
      }}
    >
      <div className='logo'>
        <Link to='/'>
          <img src={Logo} style={styling.logo} />
        </Link>
      </div>
      <div className='menuCon'>
        <div className='rightMenu'>
          {authenticated ? (
            <div>
              <AuthMenu order='horizontal' />
            </div>
          ) : (
            <div>
              <MainMenu order='horizontal' />
            </div>
          )}
        </div>
        <div className='barsMenu'>
          <MenuOutlined onClick={showDrawer} />
        </div>
        <Drawer
          // title='Vogi Menu Items'
          placement='right'
          closable={true}
          onClose={onClose}
          visible={visible}
          keyboard={true}
        >
          {authenticated ? (
            <AuthMenu order='inline' />
          ) : (
            <MainMenu order='inline' />
          )}
        </Drawer>
      </div>
    </nav>
  )
}
export default Navbar
