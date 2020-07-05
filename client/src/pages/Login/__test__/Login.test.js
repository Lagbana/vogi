import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Login from '../'

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
  render(<Login />)
})
