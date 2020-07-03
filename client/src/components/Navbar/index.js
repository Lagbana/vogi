import React from 'react'
import { Menu } from 'antd'

function Navbar() {

  state = {
    current: 'mail'
  }

  handleClick = e => {
    console.log('click ', e)
    this.setState({ current: e.key })
    }
    const { current } = this.state

    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode='horizontal'
      >
        <Menu.Item key='partners' >
          Partners
        </Menu.Item>
        <Menu.Item key='volunteers' >
          Volunteers
        </Menu.Item>
        <Menu.Item key='signup' >
          Signup
        </Menu.Item>
        <Menu.Item key='login' >
          Login
        </Menu.Item>
        {/* <Menu.Item key='alipay'>
          <a
            href='https://ant.design'
            target='_blank'
            rel='noopener noreferrer'
          >
            Navigation Four - Link
          </a>
        </Menu.Item> */}
      </Menu>
    )
  
}


export default Navbar