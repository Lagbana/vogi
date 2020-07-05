import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Form from '../'

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    }
  }

afterEach(cleanup)

test('renders without crashing', () => {
  render(<Form />)
})

// beforeEach(() => {
//   container = document.createElement('div')
//   document.body.appendChild(container)
// })

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container)
//   container.remove()
//   container = null
// })
