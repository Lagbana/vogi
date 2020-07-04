import React, { useState } from 'react'
import LeftMenu from '../LeftMenu'
import RightMenu from '../RightMenu'
import { Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './style.css'

function Navbar () {
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
        <div className='leftMenu'>
          <LeftMenu order='horizontal' />
        </div>
        <div className='rightMenu'>
          <RightMenu order='horizontal' />
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
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  )
}
export default Navbar
