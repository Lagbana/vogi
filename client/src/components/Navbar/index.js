import React, { useState } from 'react'
import MainMenu from '../MainMenu'
import AuthMenu from '../AuthMenu'
import { Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './style.css'

function Navbar ({ authenticated }) {
  //   const [current, setCurrent] = useState('mail')
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <nav className='menuBar'>
      <div className='logo'>
        <Link to='/'>VOGI</Link>
      </div>
      <div className='menuCon'>
        <div className='rightMenu'>
          {authenticated ? (
            <AuthMenu order='horizontal' />
          ) : (
            <MainMenu order='horizontal' />
          )}
        </div>
        <div className='barsMenu'>
          <MenuOutlined onClick={showDrawer} />
        </div>
        <Drawer
          title='Basic Drawer'
          placement='right'
          closable={true}
          onClose={onClose}
          visible={visible}
          keyboard={true}
        >
          {authenticated ? (
            <AuthMenu order='horizontal' />
          ) : (
            <MainMenu order='horizontal' />
          )}
        </Drawer>
      </div>
    </nav>
  )
}
export default Navbar
